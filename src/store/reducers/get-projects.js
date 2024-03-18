/* eslint-disable no-unused-vars */
import { createReducer } from '@reduxjs/toolkit';
import {
    SET_GET_PROJECTS,
    SET_GET_PROJECTS_CLEAR,
    SET_GET_PROJECTS_ERROR,
    SET_GET_PROJECTS_SUCCESS
} from '../actions/project.actions';

const initialState = {
    pending: false,
    data: [],
    error: null,
    success: false
}

const getProjectsReducer = createReducer(initialState, (builder) => {

    builder.addCase(SET_GET_PROJECTS, (state) => {
        return {
            ...state,
            pending: true,
        };
    });
    builder.addCase(SET_GET_PROJECTS_SUCCESS, (state, action) => {
        return {
            ...state,
            data: action.payload,
            pending: false,
            error: null,
            success: true
        };
    });
    builder.addCase(SET_GET_PROJECTS_ERROR, (state, action) => {
        return {
            ...state,
            error: action.payload,
            pending: false,
            data: [],
            success: false
        };
    });
    builder.addCase(SET_GET_PROJECTS_CLEAR, (state) => {
        return initialState
    });
    
});

export default getProjectsReducer;