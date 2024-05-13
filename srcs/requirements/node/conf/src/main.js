import App from "./components/app";
import MyReact from "./MyReact/MyReact";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const body = document.body;
const rootDiv = document.createElement("div");
rootDiv.id = "root";
body.insertBefore(rootDiv, body.firstChild);
const element = <App />
const container = document.getElementById("root");
window.addEventListener("popstate", () => {
  const navigationEvent = new PopStateEvent("navigate");
  window.dispatchEvent(navigationEvent);
});
MyReact.render(element, container);
