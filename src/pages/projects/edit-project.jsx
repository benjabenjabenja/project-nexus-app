/* eslint-disable react-refresh/only-export-components */
import { useActionData, useLoaderData } from "react-router-dom";
import FormEditProject from "../../compnents/projects/form-edit-project";
import { Container, Grid } from "@mui/material";
import { isValidArray } from "../../helpers/validators";
import { generateUniqueId } from "../../helpers/unique_id";


function EditProject() {
    const project = useLoaderData();
    const errorsForm = useActionData();
    return (
        <>
            <Container className={`${!isValidArray(errorsForm) ? 'hidden' : ''}`}>
                {
                    isValidArray(errorsForm) && <div className="bg-red-700 text-white rounded">
                        {
                            errorsForm.map( error => <p key={generateUniqueId()} className="px-4 py-2 mb-2">{error}</p>)
                        }
                    </div>
                }
            </Container>
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
