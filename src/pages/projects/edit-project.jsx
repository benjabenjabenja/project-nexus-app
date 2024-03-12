/* eslint-disable react-refresh/only-export-components */
import { useActionData, useLoaderData } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import FormEditProject from "../../compnents/projects/form-edit-project";
import { isValidArray } from "../../helpers/validators";
import AlertErrorForm from "../../compnents/alert-error-form";

function EditProject() {
    const project = useLoaderData();
    const errorsForm = useActionData();
    return (
        <>
            {
                isValidArray(errorsForm) && <AlertErrorForm errors={errorsForm} />
            }
            <Container maxWidth="lg">
                <Grid container alignSelf='center'>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <h1 className="text-2xl font-bold text-center">Editing Project [ <span>{`${project.id}`} </span>]</h1>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormEditProject className="m-auto" project={project} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default EditProject;
