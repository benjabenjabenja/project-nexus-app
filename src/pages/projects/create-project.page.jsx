/* eslint-disable react-refresh/only-export-components */
import { Button, Grid, TextField } from "@mui/material";
import { Form, redirect, useActionData } from "react-router-dom";
import { create_project } from "../../services/projects";
import { isValidArray } from "../../helpers/validators";
import AlertErrorForm from "../../compnents/alert-error-form";

export async function action({ request }) {
    const fd = await request.formData();
    const data = Object.fromEntries(fd);

    if (Object.values(data).includes("")) {
        alert("All fields must be filled out");
        return;
    }
    // TODO - verificar campo a campo
    const errors = [];
    const {
        projectName,
        description,
        limitDate,
    } = data;

    if (projectName === "") errors.push('Project Name is required');
    if (description === "") errors.push('Description is required');
    if (limitDate === "") errors.push('Limit Date is required');

    if(errors.length > 0){ return errors; }

    const createProjectResponse = await create_project({
        projectName,
        description,
        limitDate,
    });
     if(!isValidArray(errors)) return redirect(`/projects/${createProjectResponse.id}`);

    return errors
}

const FormCreateProject = () => {
    return (
        <Form method="post">
            <Grid container spacing={2}>
                {/* Project Name */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Project Name"
                        variant="outlined"
                        name="projectName"
                    />
                </Grid>
                {/* Limit Date */}
                <Grid item xs={12}>
                    <div className="container flex flex-column">
                        <label
                            className="my-auto mr-auto w-1/4"
                            htmlFor="limit-date"
                        >
                            Limit Date{" "}
                        </label>
                        <TextField
                            className="my-auto block w-3/4"
                            type="date"
                            name="limitDate"
                            id="limit-date"
                        />
                    </div>
                </Grid>
                {/* Description */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        name="description"
                        multiline
                        rows={4}
                    />
                </Grid>
                {/* Button createProject */}
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Create Project
                    </Button>
                </Grid>
            </Grid>
        </Form>
    );
}

function CreateProject() {
    const errorsForm = useActionData();
    return (
        <>
           
            {
                isValidArray(errorsForm) && <AlertErrorForm errors={errorsForm} />
            }
            <h2 className="text-2xl text-center font-bold m-auto">Create Project</h2>
            <FormCreateProject />
        </>
    );
}

export default CreateProject;
