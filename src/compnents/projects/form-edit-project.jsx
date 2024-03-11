/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Container, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

export async function action({ request }) {

    const fd = await request.formData();
    const asdf = request.params;
    console.log({request})
    const values = Object.fromEntries(fd);

    console.log({ values });
    return [];
}

function FormEditProject({ project }) {
    const [limitDate, setLimitDate] = useState(project.limit_date);
    useEffect(
        () => {
            if (project && project.limit_date) {
                const date = limitDate.split('/').reverse().join('-');
                setLimitDate(date);
            }
        }, []
    );
    return (
        <Form method="post">
            <Grid container spaciong={2}>
                {/* Edit project name */}
                <Grid item xs={12} sm={12} md={3}>
                    <div className="my-2 mr-2">
                    <label htmlFor="outlined-basic-projectName">Project Name</label>
                        <TextField
                            fullWidth
                            id="outlined-basic-projectName"
                            name="projectName"
                            variant="outlined"
                            value={project.projectName}
                        />
                    </div>
                </Grid>
                {/* Edit project limit date */}
                <Grid item xs={12} sm={12} md={4}>
                    <div className="my-2">
                        <label htmlFor="limit-date">
                            Limit Date
                        </label>
                        <TextField
                            fullWidth
                            type="date"
                            name="limitDate"
                            id="limit-date"
                            value={limitDate}
                        />
                    </div>
                </Grid>
                {/* Edit project description */}
                <Grid item xs={12} sm={12} md={7}>
                    <div className="my-2">
                        <label htmlFor="outlined-basic-description">Description</label>
                        <TextField
                            fullWidth
                            id="outlined-basic-description"
                            variant="outlined"
                            multiline
                            name="description"
                            value={project.description}
                        />
                    </div>
                </Grid>
                {/* button edit */}
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                    >
                        Edit Project {`[ ${project.id} ]`}
                    </Button>
                </Grid>
            </Grid>
        </Form>
    );
}

export default FormEditProject;
