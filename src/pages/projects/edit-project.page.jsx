/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useActionData, useNavigate, useParams } from "react-router-dom";
import FormEditProject from "../../compnents/projects/form-edit-project";
import { isValidArray } from "../../helpers/validators";
import AlertErrorForm from "../../compnents/alert-error-form";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";
import { useEffect, useState } from "react";
import EditTasks from '../../compnents/tasks/edit-tasks';
import useProjects from "./hooks/useProjects";

function EditProject() {
    const [tasks, setTasks] = useState([]);
    const [errors, success] = useActionData() || [];
    const { project, updateProject, getProjectById } = useProjects();

    const params = useParams();
    const navigate = useNavigate();
    const { projectId: id } = params;

    useEffect(
        () => {
            if (success && errors.length === 0) {     
                (async function () {
                    try {
                        const body = {
                            ...project,
                            ...success
                        }
                        console.log({ body });
                        await updateProject({ id, ...body });
                        navigate("/projects");
                    } catch (e) {
                        throw new Error(e.message);
                    }

                })();
            }
        }, [errors, success]
    );
    // carga las tareas de mi projecto buscado por id
    useEffect(
        () => {
            setTasks(project.tasks);
        }, [project]
    );
    // carga una vez tenga el id 
    useEffect(
        () => {
            id && getProjectById({ id });
        }, []
    );
    
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
