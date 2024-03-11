/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import { Provider, connect } from "react-redux";
import "./index.css";
import store from "./store/store";
import {
    GET_PROJECT,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR,
    GET_PROJECT_CLEAR
} from "./store/projects/project.slice";

const mapState = state => state;

const actionsCreator = {
    GET_PROJECT,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_ERROR,
    GET_PROJECT_CLEAR
};

const ConectedRouter = connect(mapState, actionsCreator)(Router);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ConectedRouter />
        </Provider>
    </React.StrictMode>
);
