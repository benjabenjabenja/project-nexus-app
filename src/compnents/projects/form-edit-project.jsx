/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, redirect } from "react-router-dom";
import { update_project } from "../../services/projects";

export async function action({ request }) {
    const errors = [];
    try {
        const fd = await request.formData();
        const values = Object.fromEntries(fd);
        const { projectName, limitDate, description } = values;
        if ([projectName, limitDate, description].includes("")) errors.push("todos los campos son requeridos");
        console.log({ values });
        const response = await update_project({ ...values, limit_date: values.limitDate });
        response && redirect("/home/projects");
        return errors || [];
    } catch (e) {
        throw new Error(e.message);
    }
}

function FormEditProject({ project }) {
    const [limitDate, setLimitDate] = useState(project?.limit_date || '');
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
            {/* Edit project name */}
            <div className="flex items-center mb-2">
                <label className="text-left w-1/6 font-black" htmlFor="outlined-basic-projectName">Project Name</label>
                <TextField
                    fullWidth
                    id="outlined-basic-projectName"
                    name="projectName"
                    variant="outlined"
                    value={project?.projectName}
                />
            </div>
            {/* Edit project limit date */}
            <div className="flex items-center mb-2">
                <label className="text-left w-1/6 font-black" htmlFor="limit-date">
                    Limit Date
                </label>
                <TextField
                    fullWidth
                    type="date"
                    name="limitDate"
                    id="limit-date"
                    value={limitDate}
                    onChange={ ev => setLimitDate(ev.target.value)}
                />
            </div>
            {/* Edit project description */}
            <div className="flex items-center mb-2">
                <label className="text-left w-1/6 font-black" htmlFor="outlined-basic-description">Description</label>
                <TextField
                    fullWidth
                    id="outlined-basic-description"
                    variant="outlined"
                    multiline
                    name="description"
                    value={project?.description}
                />
            </div>
            {/* button edit */}
            <Button
                type="submit"
                color="primary"
                variant="contained"
                className="my-4"
            >
                Edit Project {`[ ${project?.id} ]`}
            </Button>
        </Form>
    );
}

export default FormEditProject;
