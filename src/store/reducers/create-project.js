/* eslint-disable no-unused-vars */
import { createReducer } from "@reduxjs/toolkit";
import { SET_CREATE_PROJECT, SET_CREATE_PROJECT_CLEAR, SET_CREATE_PROJECT_ERROR, SET_CREATE_PROJECT_SUCCESS } from "../actions/project.actions";

const initialState = {
    pending: false,
    data: [],
    error: null,
    success: false
}

const setCreateProjectReducer = createReducer(initialState, (builder) => {
    builder.addCase(SET_CREATE_PROJECT, (state) => {
        return {
            ...state,
            pending: true
        }
    });
    builder.addCase(SET_CREATE_PROJECT_SUCCESS, (state, action) => {
        return {
            ...state,
            success: true,
            error: null,
            data: action.payload,
            pending: false
        }
    });
    builder.addCase(SET_CREATE_PROJECT_ERROR, (state, action) => {
        return {
            ...state,
            success: false,
            error: action.payload,
            data: [],
            pending: false
        }
    });
    builder.addCase(SET_CREATE_PROJECT_CLEAR, (state) => { return initialState });
});

export default setCreateProjectReducer;