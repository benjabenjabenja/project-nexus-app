/* eslint-disable no-unused-vars */
import { createReducer } from '@reduxjs/toolkit';
import {
    GET_PROJECTS,
    GET_PROJECTS_CLEAR,
    GET_PROJECTS_ERROR,
    GET_PROJECTS_SUCCESS
} from '../actions/project.actions';

const initialState = {
    pending: false,
    data: [],
    error: null,
    success: false
}

const getProjectsReducer = createReducer(initialState, (builder) => {
    builder.addCase(GET_PROJECTS, (state) => {
        return {
            ...state,
            pending: true 
        };
    });
    builder.addCase(GET_PROJECTS_SUCCESS, (state, action) => {
        return {
            ...state,
            data: action.payload,
            pending: false,
            error: null,
            success: true
        };
    });
    builder.addCase(GET_PROJECTS_ERROR, (state, action) => {
        return {
            ...state,
            error: action.payload,
            pending: false,
            data: [],
            success: false
        };
    });
    builder.addCase(GET_PROJECTS_CLEAR, (state) => {
        return initialState
    });
});

export default { getProjectsReducer };