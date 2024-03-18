/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Box, Button, Fab, Grid, TextField, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { isValidArray } from "../../helpers/validators";
import TableUsers from "../users/table-users.jsx";
import TableTask from "../tasks/table-task";
import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import AlertErrorForm from "../alert-error-form.jsx";

// add task action form
export async function action({ request }) {
    const errors = [];

    try {
        const fd = await request.formData();
        const values = Object.fromEntries(fd);

        const { limitDate, taskName } = values;
        if("".includes(limitDate) && "".includes(taskName)) errors.push("los campos son requeridos")
        if ("".includes(limitDate)) errors.push("la fecha limite es requerida");
        if ("".includes(taskName)) errors.push("el nombre de la tarea es requerido");
    
        // envio de datos
        if (Object.values(values)) {
            return [values, []];
        }
    } catch (e) {
        throw new Error(e.message);
    }

    return [[], errors];
}

const FormAddTasks = ({ errors }) => {
    return (
        <>
            {
                isValidArray(errors) && <AlertErrorForm errors={errors} />
            }
            <Form method="post" className="w-1/2 flex flex-col justify-between">
                {/* input task name */}
                <div className="mb-2">
                    <label
                        className="text-left w-full font-black"
                        htmlFor="outlined-basic-taskName"> Task Name </label>
                    <TextField
                        fullWidth
                        id="outlined-basic-taskName"
                        name="taskName"
                        variant="outlined"
                    />
                </div>
                {/* input date limit */}
                <div className="mb-2">
                    <label className="text-left w-1/6 font-black" htmlFor="limit-date">
                        Limit Date
                    </label>
                    <TextField
                        fullWidth
                        type="date"
                        name="limitDate"
                        id="limit-date"
                    />
                </div>
                <div className="w-1/7 mr-0 ml-auto">
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"> Add Task </Button>
                </div>
            </Form>
        </>
    )
}

const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        color: 'white'
    }
}

const AddTasks = ({ addTask, setAddTask, errors }) => {

    const handdlerAddTasks = (ev) => {
        ev.preventDefault();
        setAddTask(true);
    }

    return (
        <>
            {
                addTask ? 
                    <>
                        <FormAddTasks errors={errors} />
                    </> : 
                    <Fab
                    title="add tasks"
                    onClick={handdlerAddTasks}
                    classes={classes.customFab}
                    aria-label="add"
                    variant="extended"
                    size="small"
                >
                    <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} /> Add Tasks
                </Fab>
        }
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
        >
            <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} /> Add Users
        </Fab>
    );
}

const ProjectDetail = ({ project }) => {

    const [newTask, errors] = useActionData() || []; 
    const [tasks, setTasks] = useState(project?.tasks);
    const [addTask, setAddTask] = useState(false);

    console.log({tasks})

    useEffect(
        () => {
            const addTaskFn = async () => {
                if (addTask) {
                    newTask && setTasks([...tasks, newTask]);
                }
            }
            addTaskFn();
        }, [addTask]
    );

    return (
        <main className="p-4 mx-4 w-full">
            <Grid container>
                <Grid className="py-3" item xs={12} sm={12} md={4} lg={4}>
                    Project Name: <strong>{` ${project?.projectName}`} </strong>
                </Grid>
                <Grid className="py-3" item xs={12} sm={12} md={4} lg={4}>
                    Limit Date: <strong>{` ${project.limitDate ?? '-'}`}</strong>
                </Grid>
                <Grid className="py-3" item xs={12} sm={12} md={6} lg={6}>
                    Project Description: <strong>{` ${project.description ?? 'Empty Description'}`} </strong>
                </Grid>
            </Grid>
            <section className="flex items-center py-6 my-auto">
                {
                    tasks?.length === 0 && !addTask && <p className="font-semibold mr-2">No task in this project.</p>
                }
                <AddTasks
                    addTask={addTask}
                    setAddTask={setAddTask}
                    errors={errors}
                />
            </section>
            <section>
                {
                    isValidArray(project.tasks) && 
                    <Box sx={{ margin: 1 }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            component="div"
                        >
                            Tasks
                        </Typography>
                        <TableTask tasks={project.tasks} errors={errors} />
                    </Box>
            
                }
            </section>
            <section>
                <Box sx={{ margin: 1 }}>
                    <section className="flex items-center px-10 py-6 my-auto">
                        <p className="font-semibold mr-2">No members in this project.</p>
                        <AddUsersButton />
                    </section>
                </Box>
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