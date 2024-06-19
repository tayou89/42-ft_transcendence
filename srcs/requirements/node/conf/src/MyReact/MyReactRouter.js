import { useEffect, useState, MyReact } from "./MyReact.js";

export function Route({path, component: Component}) {
    const [curPath, setCurPath] = useState(window.location.pathname);
    const [props, setProps] = useState({});

    useEffect(() => {
        const onLocationChange = (event) => {
            setCurPath(_ => window.location.pathname);
            if (event.state) {
                console.log("event.state1:", event.state);
                setProps((prev) => {
                    console.log("prev:", prev);
                    console.log("event.state2:", event.state);
                    return ({...prev, ...event.state});
                });
            }
        }
        window.addEventListener("navigate", onLocationChange);
        return () => {
            window.removeEventListener("navigate", onLocationChange);
        };
    }, [setCurPath, setProps]);
    return curPath === path ? <div><Component {...props} /></div> : null;
}

export function Link({to, children, props, ...others}) {
    const preventReload = (event) => {
        const state = props ? props : {};
        console.log("Link state:", state);
        event.preventDefault();
        window.history.pushState(state, "", to);
        const navigationEvent = new PopStateEvent("navigate", { state:  state });
        window.dispatchEvent(navigationEvent);
    };
    return (
        <a href={to} onClick={preventReload} {...others}>
            {children}
        </a>
    )
}

export function navigate(to, props) {
    const state = props ? props : {};
    console.log("Navigate state:", state);
    window.history.pushState(state, "", to);
    const navigationEvent = new PopStateEvent("navigate", { state: state });
    window.dispatchEvent(navigationEvent);
}

const MyReactRouter = {
    Router: Route,
    Link,
    navigate,
};

export default MyReactRouter;