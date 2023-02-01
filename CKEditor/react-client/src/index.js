import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { RouterProvider } from "react-router-dom";
import { PostContextProvider } from "./context/PostContextProvider";
import MainRouter from "./layout/MainRouter";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <PostContextProvider>
      <RouterProvider router={MainRouter} />
    </PostContextProvider>
  </React.StrictMode>
);
