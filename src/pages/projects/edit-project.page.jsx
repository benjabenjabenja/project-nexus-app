/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useActionData, useNavigate, useParams } from "react-router-dom";
import FormEditProject from "../../compnents/projects/form-edit-project";
import { isValidArray, isValidObject } from "../../helpers/validators";
import AlertErrorForm from "../../compnents/alert-error-form";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";
import { useEffect, useState } from "react";
import useProjects from "./hooks/useProjects";
import TableTask from "../../compnents/tasks/table-task";
import FormAddTasks from "../../compnents/tasks/form-add-task";

function EditProject() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});
    const [errors, success] = useActionData() || [];
    const { project, updateProject, getProjectById, auth } = useProjects();
    const { user } = auth;
    const getIsAdmin = () => {
        return user?.role === "ADMIN";
    }

    const params = useParams();
    const navigate = useNavigate();

    const { projectId: id } = params;

    useEffect(
        () => {
            
            if (success && errors.length === 0) {     
                (async function () {
                    try {
                        // only projects
                        let body = {
                            ...project,
                            limitDate: success?.limitDate ?? project?.limitDate,
                            description: success?.description ?? project?.description,
                            projectName: success?.projectName ?? project?.projectName
                        }
                        // only task 
                        if (isValidObject(task)) {
                            const i = tasks.findIndex(t => t.id === task?.id);
                            let filtered = [...tasks];
                            filtered[i] = {
                                ...task,
                                limitDate: success?.limitDateTask,
                                taskDescription: success?.taskDescription
                            };
                            body.tasks = filtered;
                        }
                        const res = await updateProject({ id, ...body });
                        isValidObject(res) && setTask({});
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
                {
                    project && <FormEditProject className="m-auto" project={project} isAdmin={getIsAdmin()} />
                }
            </section>

            <br />

            <section className="container w-2/3 m-auto">
                
                <TableTask
                    tasks={tasks}
                    isAdmin={getIsAdmin()}
                    setTasks={setTasks}
                    setTask={setTask}
                />
            </section>
            <section className="container w-2/3 m-auto">
                {
                    isValidObject(task) && <FormAddTasks errors={errors} task={task} setTask={setTask} />
                }
            </section>
        </WrapperContainerPages>
    );
}

export default EditProject;
