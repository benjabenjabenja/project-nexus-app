import { createAction } from "@reduxjs/toolkit";

// GET
export const SET_GET_PROJECTS = createAction('@SET_GET_PROJECTS');
export const SET_GET_PROJECTS_SUCCESS = createAction('@SET_GET_PROJECTS/SUCCESS');
export const SET_GET_PROJECTS_ERROR = createAction('@SET_GET_PROJECTS/ERROR');
export const SET_GET_PROJECTS_CLEAR = createAction('@SET_GET_PROJECTS/CLEAR');

// CREATE
export const SET_CREATE_PROJECT = createAction('@SET_CREATE_PROJECT');
export const SET_CREATE_PROJECT_SUCCESS = createAction('@SET_CREATE_PROJECT/SUCCESS');
export const SET_CREATE_PROJECT_ERROR = createAction('@SET_CREATE_PROJECT/ERROR');
export const SET_CREATE_PROJECT_CLEAR = createAction('@SET_CREATE_PROJECT/CLEAR');

// UPDATE
export const SET_UPDATE_PROJECT = createAction('@SET_UPDATE_PROJECT');
export const SET_UPDATE_PROJECT_SUCCESS = createAction('@SET_UPDATE_PROJECT/SUCCESS');
export const SET_UPDATE_PROJECT_ERROR = createAction('@SET_UPDATE_PROJECT/ERROR');
export const SET_UPDATE_PROJECT_CLEAR = createAction('@SET_UPDATE_PROJECT/CLEAR');