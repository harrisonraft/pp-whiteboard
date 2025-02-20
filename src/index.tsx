import React from "react";
import { createRoot } from "react-dom/client"
import { App } from "./app";
import "./main.css"

const main = document.getElementById("app");

if (main !== null) {
    const root = createRoot(main);
    root.render(<App />)
}
