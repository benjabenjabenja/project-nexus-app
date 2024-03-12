import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setCreateProjectReducer from "./reducers/create-project";
import getProjectsReducer from './reducers/get-projects';

const rootReducers = combineReducers({
    getProjects: getProjectsReducer,
    createProject: setCreateProjectReducer,
});

const store = configureStore({
    reducer: rootReducers,
});

export default store;