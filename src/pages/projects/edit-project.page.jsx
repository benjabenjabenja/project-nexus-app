/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useActionData, useLoaderData, useNavigate, useParams } from "react-router-dom";
import FormEditProject from "../../compnents/projects/form-edit-project";
import { isValidArray } from "../../helpers/validators";
import AlertErrorForm from "../../compnents/alert-error-form";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";
import { useEffect, useState } from "react";
import { get_project_by_id, update_project } from "../../services/projects";
import EditTasks from '../../compnents/tasks/edit-tasks';

function EditProject() {
    const [tasks, setTasks] = useState([]);
    const [errors, success] = useActionData() || [];
    
    const navigate = useNavigate();
    const project = useLoaderData();
    const params = useParams();
    const { id } = params;
    useEffect(
        () => {
            const updateProject = async () => {
                try {
                    console.log({errors, success})
                    // const response = await update_project({ id, data: success });
                    // navigate("/projects");
                } catch (e) {
                    throw new Error(e.message);
                }
            }
            updateProject();
        }, [errors, success]
    );
    
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
    
            <section className="container w-2/3 m-auto">
                {
                    isValidArray(errors) && <AlertErrorForm errors={errors || []} />
                }
                <FormEditProject className="m-auto" project={project} />
            </section>

            <br />

            <section className="container w-2/3 m-auto">
                <EditTasks tasks={tasks} setTasks={setTasks} />
            </section>
            
        </WrapperContainerPages>
    );
}

export default EditProject;
