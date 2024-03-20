/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fab, TextField } from "@mui/material";
import AlertErrorForm from "../alert-error-form";
import { isValidArray, isValidObject } from "../../helpers/validators";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// button fab classes
const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        color: 'white'
    }
}

const FormAddTasks = ({ errors, setAddTask, task, setTask }) => {

    const [taskDescription, settaskDescription] = useState(task?.taskDescription ?? '');
    const [limitDateTask, setLimitDateTask] = useState(task?.limitDate ?? '');

    useEffect(
        () => {
            task && isValidObject(task) && settaskDescription(task?.taskDescription);
            task && isValidObject(task) && setLimitDateTask(task?.limitDate);
        }, [task]
    )

    return (
        <>
            <Form method="post" className="w-2/3 flex flex-col justify-between bg-slate-50 p-6">
                {
                    isValidArray(errors) && <AlertErrorForm errors={errors} />
                }
                {/* input task name */}
                <div className="mb-2">
                    <label
                        className="block text-left w-full font-black"
                        htmlFor="outlined-basic-taskDescription"> Task Description </label>
                    <TextField
                        fullWidth
                        id="outlined-basic-taskDescription"
                        name="taskDescription"
                        variant="outlined"
                        value={taskDescription}
                        onChange={ev => settaskDescription(ev.target.value)}
                        required
                    />
                </div>
                {/* input date limit */}
                <div className="mb-2">
                    <label className="block text-left w-full font-black" htmlFor="limit-date">
                        Limit Date
                    </label>
                    <TextField
                        fullWidth
                        type="date"
                        name="limitDateTask"
                        id="limit-date"
                        value={limitDateTask}
                        onChange={ev => setLimitDateTask(ev.target.value)}
                        required
                    />
                </div>
                {
                    <div className="w-full flex items-center justify-between mr-0 ml-auto">
                        <Fab
                            title="add tasks"// condicional
                            classes={classes.customFab}
                            aria-label="add"
                            variant="extended"
                            size="small"
                            color="primary"
                            type="submit"
                        >
                            <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} /> { task?.id ? "Edit " : "Add"} Task
                        </Fab>
                        <Fab
                            title="cancel"
                            classes={classes.customFab}
                            aria-label="cancel"
                            variant="extended"
                            size="small"
                            color="error"
                            onClick={() => {
                                // en agregar
                                setAddTask && setAddTask(false);
                                // en editar
                                setTask && setTask({});
                            }}
                            type="submit"
                        >
                            Cancel
                        </Fab>
                    </div>
                }
            </Form>
        </>
    );
}

export default FormAddTasks;