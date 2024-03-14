/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext } from "react";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    
    return (
        <ProjectContext.Provider value={{

        }}>
            { children }
        </ProjectContext.Provider>
    );
}

export {
    ProjectProvider
}

export default ProjectContext