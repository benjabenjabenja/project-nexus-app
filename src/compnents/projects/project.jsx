/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { useLoaderData } from "react-router-dom";
import { get_project_by_id } from "../../services/projects";
import { Grid } from "@mui/material";

import ProjectDetail from "./project-detail";

export async function loader({ params }) {
    let res = [];
    if (params.id) {
        res = await get_project_by_id(params);
    }
    return res;
}

function Project() {
    const project = useLoaderData();
    return (
        <Grid container spacing={2}>
            <Grid item lg={10}>
                <h1 className="text-2xl font-bold text-center mb-6">
                    {`${project.projectName ?? ''} - ${project.id ?? ''}`}
                </h1>
            </Grid>
            <ProjectDetail project={project} />
        </Grid>
    );
}

export default Project;
