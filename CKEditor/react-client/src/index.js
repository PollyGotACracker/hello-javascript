import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { PostContextProvider } from "./context/PostContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <PostContextProvider>
    <App />
  </PostContextProvider>
  // </React.StrictMode>
);
