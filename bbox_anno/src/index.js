import React from "react";
import ReactDOM from "react-dom/client";
import Annotataor from "./annotator";
import Draggable from "react-draggable";
import "./styles.css";
import App from "./App"

const options = [
  { key: 1, text: "IPsoft", value: "IPsoft" },
  { key: 2, text: "Google", value: "Google" },
  { key: 3, text: "Mozilla", value: "Mozilla" },
  { key: 4, text: "Safari", value: "Safari" }
];

const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(rootElement);

// Render your app inside the root
root.render(<App options = {options} />);