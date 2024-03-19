/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

export async function action({ request }) {
    const errors = [];
    try {
        const fd = await request.formData();
        const values = Object.fromEntries(fd);

        const { projectName, limitDate, description } = values;

        if ([projectName, limitDate, description].includes("")) {

            if ([projectName].includes("")) { errors.push("el nombre es requerido"); }
            if ([limitDate].includes("")) errors.push("la fecha limite es requerida");
            if ([description].includes("")) errors.push("la descripcion es requerida");
            
            return [errors, []];
        }
        
        return [[], values || []];
    } catch (e) {
        throw new Error(e.message);
    }
}

function FormEditProject({ project }) {
    const [limitDate, setLimitDate] = useState('');
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    console.log({ project })
    useEffect(
        () => {
            if (project) {
                setLimitDate(project?.limitDate)
                setProjectName(project?.projectName)
                setDescription(project?.description)
            }
            if (project && project?.limit_date) {
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
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
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
                    value={description}
                    onChange={e => setDescription(e.target.value)}
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
