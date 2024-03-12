/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useActionData, useLoaderData, useParams } from "react-router-dom";
import FormEditProject from "../../compnents/projects/form-edit-project";
import { isValidArray } from "../../helpers/validators";
import AlertErrorForm from "../../compnents/alert-error-form";
import EditTasks from "../../compnents/tasks/edit-tasks";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";
import { useEffect, useState } from "react";
import { get_project_by_id } from "../../services/projects";

function EditProject() {
    const [tasks, setTasks] = useState([]);
    const project = useLoaderData();
    const errorsForm = useActionData();
    const params = useParams();
    const { id } = params;
    
    useEffect(
        () => {
            (async function() { 
                try {
                    const response = await get_project_by_id({ id });
                    if (response) {
                        // cargar projecto a la store
                        setTasks(response.tasks);
                    }
                } catch (e) {
                    throw new Error(e.message)
                }
            })();
        }, []);
    
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
