/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import ProjectDetail from "../../compnents/projects/project-detail";
import useProjects from "./hooks/useProjects";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";

function Project() {
    const { projectId: id } = useParams();
    const { project, getProjectById, updateProjectTasks } = useProjects();

    useEffect(
        () => {
            id && getProjectById({ id });
        }, [id]
    );

    return (
        <WrapperContainerPages>
            <h1 className="text-2xl font-bold text-center mb-6">
                {`${project.projectName ?? ''} - ${project.id ?? ''}`}
            </h1>
            <ProjectDetail project={project} updateProjectTasks={updateProjectTasks} />
        </WrapperContainerPages>
    );
}

export default Project;
