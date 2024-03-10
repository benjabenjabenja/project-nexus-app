/* eslint-disable react-refresh/only-export-components */
import { Button, Container, Grid, TextField } from "@mui/material";
import { Form, useActionData, /* useNavigate */ } from "react-router-dom";
import { create_project } from "../../services/projects";

export async function action({ request }) {
    const fd = await request.formData();
    const data = Object.fromEntries(fd);

    if (Object.values(data).includes("")) {
        alert("All fields must be filled out");
        return;
    }
    const {
        projectName,
        description,
        limitDate,
    } = data;
    const createProjectResponse = await create_project({
        projectName,
        description,
        limitDate,
    });
    return createProjectResponse || [];
}

function CreateProject() {
    const createProjectResponse = useActionData();
    console.log({ createProjectResponse });
    // const navigation = useNavigate();

    return (
        <>
            <Container maxWidth="sm">
                <h2 className="text-xl mb-3">Create Project</h2>
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
            </Container>
        </>
    );
}

export default CreateProject;
