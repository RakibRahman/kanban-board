import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
// import { Counter } from './test';
import { AppStateProvider } from "./context/AppStateContext";

import reportWebVitals from "./reportWebVitals";
import "./index.css";
ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <React.StrictMode>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </React.StrictMode>
  </DndProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
