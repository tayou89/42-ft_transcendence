import App from "./components/app";
import MyReact from "./MyReact/MyReact";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";

const body = document.body;
body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2693&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
body.style.backgroundPosition = "center";
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