import { useEffect, useState, MyReact } from "./MyReact.js";

export function Route({path, component}) {
    const [curPath, setCurPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setCurPath(_ => window.location.pathname);
        }
        window.addEventListener("navigate", onLocationChange);
        return () => {
            window.removeEventListener("navigate", onLocationChange);
        };
    }, [setCurPath]);
    return curPath === path ? component() : null;
}

export function Link({to, children, ...others}) {
    const preventReload = (event) => {
        event.preventDefault();
        window.history.pushState({}, "", to);
        const navigationEvent = new PopStateEvent("navigate");
        window.dispatchEvent(navigationEvent);
    };
    return (
        <a href={to} onClick={preventReload} {...others}>
            {children}
        </a>
    )
}

const MyReactRouter = {
    Router: Route,
    Link,
};

export default MyReactRouter;