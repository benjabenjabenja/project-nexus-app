import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setCreateProjectReducer from "./projects/reducers/create-project";
import getProjectsReducer from './projects/reducers/get-projects';

const rootReducers = combineReducers({
    getProjects: getProjectsReducer,
    createProject: setCreateProjectReducer,
});

const store = configureStore({
    reducer: rootReducers,
});

export default store;