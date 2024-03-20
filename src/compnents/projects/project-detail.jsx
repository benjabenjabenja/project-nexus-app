/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Box, Fab, Grid, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { isValidArray, isValidObject } from "../../helpers/validators";
import TableUsers from "../users/table-users.jsx";
import TableTask from "../tasks/table-task";
import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import { generateUniqueId } from "../../helpers/unique_id.js";
import FormAddTasks from "../tasks/form-add-task.jsx";

// add task action form
export async function action({ request }) {
    const errors = [];

    try {
        const fd = await request.formData();
        const values = Object.fromEntries(fd);

        const { limitDate, taskDescription } = values;
        if("".includes(limitDate) && "".includes(taskDescription)) errors.push("los campos son requeridos")
        if ("".includes(limitDate)) errors.push("la fecha limite es requerida");
        if ("".includes(taskDescription)) errors.push("el nombre de la tarea es requerido");
    
        // envio de datos
        if (Object.values(values)) {
            const task = {
                ...values,
                complete: false,
                id: generateUniqueId()
            }
            return [task, []];
        }
    } catch (e) {
        throw new Error(e.message);
    }

    return [null, errors];
}
// button fab classes
const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        color: 'white'
    }
}

const AddTasksButton = ({ addTask, setAddTask }) => {

    const handdlerAddTasks = (ev) => {
        ev.preventDefault();
        setAddTask(true);
    }

    return (<>
            { !addTask && <Fab
                title="add tasks"
                onClick={handdlerAddTasks}
                classes={classes.customFab}
                aria-label="add"
                variant="extended"
                size="small"
                color="primary"
                type="submit"
            >
                <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} /> Add Tasks
            </Fab>}
    </>
    );
}

const AddUsersButton = () => {
    
    const handdlerAddUsers = ev => {
        ev.preventDefault();

    }
    return (
        <Fab
            title="add members"
            onClick={handdlerAddUsers}
            classes={classes.customFab}
            aria-label="add"
            variant="extended"
            size="small"
            color="primary"
        >
            <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} /> Add Users
        </Fab>
    );
}

// page principal
const ProjectDetail = ({ project, updateProjectTasks }) => {
    const [addTask, setAddTask] = useState(false);
    const [tasks, setTasks] = useState(project?.tasks ?? []);
    const [newTask, errors] = useActionData() || []; 

    useEffect(
        () => {
            addTask && isValidObject(newTask) && (async () => {
                if (newTask) {
                    const nt = {
                        ...newTask,
                        limitDate: newTask?.limitDateTask,
                        taskDescription: newTask?.taskDescription
                    }
                    const modified = [...tasks, nt ];
                    const response = await updateProjectTasks({ id: project.id, tasks: nt });
                    isValidObject(response) && setTasks(modified);
                }
            })();

        }, [newTask]
    );

    useEffect(
        () => {
            isValidObject(project) && setTasks(project?.tasks)
        },[project]
    );

    return (
        <main className="p-4 mx-4 w-full">
            <Grid className="w-full" container>
                <Grid className="py-3 text-start" item xs={12} sm={12} md={4} lg={4}>
                    Project Name: <strong>{` ${project?.projectName}`} </strong>
                </Grid>
                <Grid className="py-3 text-start" item xs={12} sm={12} md={4} lg={4}>
                    Limit Date: <strong>{` ${project.limitDate ?? '-'}`}</strong>
                </Grid>
                <Grid className="py-3 text-start whitespace-nowrap" item xs={12} sm={12} md={4} lg={4}>
                    Project Description: <strong>{` ${project.description ?? 'Empty Description'}`} </strong>
                </Grid>
            </Grid>
            {/*  Tasks */}
            <section className="flex items-center py-6 my-auto w-2/3">
                {
                    addTask && <FormAddTasks errors={errors} setAddTask={setAddTask} />
                }
                <AddTasksButton
                    addTask={addTask}
                    setAddTask={setAddTask}
                />
            </section>
            {/*  */}
            <section className="w-2/3 ml-0 mr-auto my-auto">
                <Typography
                    className="text-left"
                    margin={2}
                    variant="h5"
                    gutterBottom
                    component="div"
                > Tasks </Typography>
                {
                    isValidArray(project.tasks) && <>
                        {
                            tasks?.length === 0 && !addTask && <p className="font-semibold mr-2">No task in this project.</p>
                        }
                        
                        <TableTask tasks={project.tasks} errors={errors} />
                    </>
                }
            </section>
            <section className="w-2/3 ml-0 mr-auto my-auto">
                <div className="flex items-center my-2 mx-auto">
                    {
                        !isValidArray(project?.users) && <p className="font-semibold mr-4">No members in this project.</p>
                    }

                    <AddUsersButton />
                </div>
                {
                    isValidArray(project?.users) &&
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Members
                            </Typography>
                            <TableUsers tasks={project.users} />
                        </Box> 
                }
            </section>
        </main>
    );
}
export default ProjectDetail;