/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { isValidArray } from '../helpers/validators'; 
import { get_projects } from "../services/projects";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    useEffect(
        () => {
            const getProjects = async () => {
                const projectsResponse = JSON.parse(localStorage.getItem("projects")) || await get_projects();
                if (!isValidArray(projectsResponse)) {
                    return;
                }
                setProjects([...projectsResponse]);
            }
            getProjects();
        } , []
    );

    return (
        <ProjectContext.Provider value={{
            projects, setProjects
        }}>
            { children }
        </ProjectContext.Provider>
    );
}

export {
    ProjectProvider
}

export default ProjectContext