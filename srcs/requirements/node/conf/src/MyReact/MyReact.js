function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      )
    }
  };
}

export function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function createDom(fiber) {
  const dom =
  fiber.type == "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);
  return dom;
}

const isEvent = key => key.startsWith("on");
const isProperty = key => key !== "children" && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);
function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event Listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    })
  //Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      if (name.startsWith("data-")) {
        dom.removeAttribute(name);
      }
      else {
        dom[name] = "";
      }
    });
  //Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      if (name.startsWith("data-")) {
        dom.setAttribute(name, nextProps[name]);
      }
      else {
        dom[name] = nextProps[name];
      }
    });
  //Add event Listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    })
}

function commitRoot() {
  deletions.forEach((fiber) => {
    if (!fiber) {
      return;
    }
    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
      domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;
    commitDeletion(fiber, domParent);
  });
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  }
  // else if (fiber.effectTag === "DELETION") {
  //   commitDeletion(fiber, domParent);
  //   fiber.effectTag = "DELETED";
  //   commitWork(fiber.sibling);
  //   return;
  // }
  else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  }
  else {
    commitDeletion(fiber.child, domParent);
  }
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  }
  deletions = [];
  nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;
let deletions = null;

//랜더링 도중 dom이 업데이트 되면 부자연스러우므로 idle상태일 때만 업데이트 진행
function workLoop() {
  
  onUpdate = true;
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
    // console.log("===================commit======================");
  }
  setStateQueue.forEach((obj) => {
    obj.queue.push(obj.action);
    wipRoot = obj.root;
    nextUnitOfWork = wipRoot;
  });
  setStateQueue.length = 0;
  onUpdate = false;
  requestAnimationFrame(workLoop);
}
//requestIdleCallback()는 콜스택이 비어있을 경우(idle 상태) 콜백실행
requestAnimationFrame(workLoop);

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  }
  else {
    updateHostComponent(fiber);
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

let wipFiber = null;
let hookIndex = null;
let effectIndex = null;

function updateFunctionComponent(fiber) {
  const oldHooks = fiber.alternate && fiber.alternate.hooks;

  wipFiber = fiber;
  hookIndex = 0;
  effectIndex = 0;
  wipFiber.hooks = oldHooks ? oldHooks : [];
  wipFiber.effects = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

let setStateQueue = [];
let onUpdate = false;

export function useState(initial) {
  const oldHook = wipFiber.hooks[hookIndex];
  const NewHook = {
    state: initial,
    queue: [],
  };
  const hook = oldHook ? oldHook : NewHook;
  const actions = hook.queue;
  actions.forEach(action => {
    hook.state = action(hook.state);
  });
  actions.length = 0;
  const setState = action => {
    const tmpRoot = {
      dom: currentRoot ? currentRoot.dom : wipRoot.dom,
      props: currentRoot ? currentRoot.props: wipRoot.props,
      alternate: currentRoot ? currentRoot: wipRoot,
    };
    if (!onUpdate) {
      hook.queue.push(action);
      wipRoot = tmpRoot;
      nextUnitOfWork = wipRoot;
      deletions = [];
    }
    else {
      setStateQueue.push({
        queue: hook.queue,
        action: action,
        root: tmpRoot,
      });
    }
  };
  if (!oldHook) {
    wipFiber.hooks.push(hook);
  }
  ++hookIndex;
  return [hook.state, setState];
}
export function useEffect(callback, deps) {
  const oldEffect =
    wipFiber.alternate &&
    wipFiber.alternate.effects &&
    wipFiber.alternate.effects[effectIndex];
  const effect = {
    deps: deps,
    cleanUp: null,
  };
  let hasChanged = true;
  const oldDeps = oldEffect ? oldEffect.deps : null;
  if (oldDeps && deps) {
    hasChanged = deps.some(
      (dep, i) => !Object.is(dep, oldDeps[i])
    );
  }
  if (hasChanged) {
    const cleanUp = oldEffect ? oldEffect.cleanUp : null;
    if (cleanUp) {
      cleanUp();
    }
    effect.cleanUp = callback();
  }
  wipFiber.effects.push(effect);
  ++effectIndex;
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
}

function reconcileChildren(wipFiber, elements) {
  let index = 0;
  /*
  short circuit evaluation: 전체 결과가 참이 되는 시점의 값을 대입해준다.
  만약 wipFiber.alternate && wipFiber.alternate.child가 참이면 wipFiber.alternate.child,
  거짓이면 null이 된다.
  let a = "apple" || "banana";  // a === "apple"
  let a = "apple" && "banana";  // a === "banana"
  */
  let oldFiber
    = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;
  elements = elements.flat();
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    const sameType
      = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      }
    }
    else {
      if (element) {
        newFiber = {
          type: element.type,
          props: element.props,
          dom: null,
          parent: wipFiber,
          alternate: null,
          effectTag: "PLACEMENT",
        }
      }
      if (oldFiber) {
        const oldEffects =
          oldFiber.alternate &&
          oldFiber.alternate.effects;
        if (oldEffects) {
          oldEffects.forEach(({_, cleanUp}) => cleanUp());
        }
        oldFiber.effectTag = "DELETION";
        deletions.push(oldFiber);
      }
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      wipFiber.child = newFiber;
    }
    else if (element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    ++index;
  }
}

export const MyReact = {
  createElement,
  render,
  useState,
  useEffect,
};

export default MyReact;