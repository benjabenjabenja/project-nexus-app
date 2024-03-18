import { createSlice } from "@reduxjs/toolkit";
import getProjectsReducer from './reducers/get-projects';

const ProjectsSlice = createSlice({
    name: 'projects',
    initialState: [],
    reducers: getProjectsReducer,
});

const { actions, reducer } = ProjectsSlice;

export const { SET_GET_PROJECT, SET_GET_PROJECT_SUCCESS, SET_GET_PROJECT_ERROR, SET_GET_PROJECT_CLEAR } = actions;

export default reducer;