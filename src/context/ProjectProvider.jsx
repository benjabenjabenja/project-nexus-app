/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { isValidArray } from '../helpers/validators'; 
import { get_projects } from "../services/projects";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { SET_GET_PROJECTS, SET_GET_PROJECTS_SUCCESS } from "../store/actions/project.actions";

const ProjectContext = createContext();
// maneja los projectos
const ProjectProvider = ({ children }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state.projects);
    const [projects, setProjects] = useState([]);
    const { auth } = useAuth();
    

    const getProjects = async () => {

        const projectsResponse = await get_projects();
        dispatch(SET_GET_PROJECTS_SUCCESS(projectsResponse));
        console.log({ store, projectsResponse });
        if (!isValidArray(projectsResponse)) {
            return;
        }
        setProjects(() => auth.role === "ADMIN" ? [...projectsResponse] : [...projectsResponse.filter(
            v => v?.user?.id === auth?.id
        )]);
    }

    const update = async ({id, ...values}) => {
        const res = await get_projects({id, data: values});
    }

    useEffect(
        () => { 
            
            projects.length <= 0 && getProjects()
        } , []
    );

    return (
        <ProjectContext.Provider value={{
            projects,
            setProjects,
            getProjects
        }}>
            { children }
        </ProjectContext.Provider>
    );
}

export {
    ProjectProvider
}

export default ProjectContext