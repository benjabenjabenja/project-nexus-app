import { createSlice } from "@reduxjs/toolkit";
import getProjectsReducer from './reducers/get-projects';

const ProjectsSlice = createSlice({
    name: 'projects',
    initialState: [],
    reducer: getProjectsReducer
});

const { actions, reducer } = ProjectsSlice;

export const { SET_GET_PROJECTS, SET_GET_PROJECTS_SUCCESS, SET_GET_PROJECTS_ERROR, SET_GET_PROJECTS_CLEAR } = actions;

export default reducer;