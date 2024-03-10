/* eslint-disable react-refresh/only-export-components */

import { useLoaderData } from "react-router-dom";
import { get_project_by_id } from "../../services/projects";
import { Grid } from "@mui/material";

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
        <div className="container">
            <h1 className="text-2xl font-bold text-center">{ `${project.projectName ?? ''} - ${project.id ?? ''}` }</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    { project.description ?? 'Empty Description' }
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    { project.limitDate ?? '' }
                </Grid>
            </Grid>
        </div>
    );
}

export default Project;
