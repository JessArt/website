import React from "react";
import ReactDOM from "react-dom";
import Router from "../shared/router/routes";
import { Provider } from "react-redux";
import "../shared/styles/common.css";
import "../shared/styles/common.sass";
import createStore from "../shared/store/redux";

const { store } = createStore({ initialState: window.__INITIAL_DATA__ });

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>{Router}</Provider>,
    document.getElementById("app")
  );
});
