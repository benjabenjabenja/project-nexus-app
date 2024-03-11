import { createSlice } from "@reduxjs/toolkit";
import getProjectsReducer from './reducers/get-projects';

const ProjectsSlice = createSlice({
    name: 'projects',
    initialState: [],
    reducers: getProjectsReducer,
});

const { actions, reducer } = ProjectsSlice;

export const { GET_PROJECT, GET_PROJECT_SUCCESS, GET_PROJECT_ERROR, GET_PROJECT_CLEAR } = actions;

export default reducer;