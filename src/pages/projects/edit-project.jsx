/* eslint-disable react-refresh/only-export-components */
import { useActionData, useLoaderData } from "react-router-dom";
import FormEditProject from "../../compnents/projects/form-edit-project";
import { isValidArray } from "../../helpers/validators";
import AlertErrorForm from "../../compnents/alert-error-form";
import EditTasks from "../../compnents/tasks/edit-tasks";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";
import { useState } from "react";

function EditProject() {
    const project = useLoaderData();
    const errorsForm = useActionData();
    const [tasks, setTasks] = useState([]);
    return (
        <WrapperContainerPages>
            
            <h1 className="text-2xl font-bold text-center mb-8 mt-3">Editing Project [ <span>{`${project.id}`} </span>]</h1>
                    
            {
                isValidArray(errorsForm) && <AlertErrorForm errors={errorsForm} />
            }

            <section className="container m-auto">
                <FormEditProject className="m-auto" project={project} />
            </section>
            <br />
            <section className="container m-auto">
                <EditTasks tasks={tasks} setTasks={setTasks} />
            </section>
        </WrapperContainerPages>
    );
}

export default EditProject;
