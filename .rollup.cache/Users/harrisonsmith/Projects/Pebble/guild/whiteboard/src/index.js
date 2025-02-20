import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./main.css";
var main = document.getElementById("app");
if (main !== null) {
    var root = createRoot(main);
    root.render(React.createElement(App, null));
}
//# sourceMappingURL=index.js.map