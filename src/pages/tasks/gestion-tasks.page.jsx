/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Fab } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import { get_tasks } from "../../services/tasks";
import TableTask from "../../compnents/tasks/table-task";

export async function loader() {
    const response = await get_tasks();
    return response ?? [];
}

const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        margin: '0 auto',
        color: 'white'
    }
}

function GestionTasks() {
    const [showOutlet, setShowOutlet] = useState(false);
    const tasks = useLoaderData();

    return (
        <>
        <main className='container'>
                <h1 className={`text-2xl font-bold text-center mb-4 ${showOutlet ? 'hidden' : ''}`}>Gestion de Tareas</h1>
                <section className={`container flex justify-between ${showOutlet ? 'hidden' : ''}`}>

                    <h2 className="text-left text-xl py-5 my-auto">Aqui podras gestionar tus projectos.</h2>
                    <Fab
                        title="nav to /create-task"
                        classes={classes.customFab}
                        aria-label="add"
                        variant="extended"
                        size="medium"
                    >
                        <AddIcon sx={{ mr: 1 }} /> Add Task
                    </Fab>
                </section>

                <section className={`container ${showOutlet ? 'hidden' : ''}`} >
                    {
                        tasks && <TableTask tasks={tasks}/>
                    }
                </section>

                <section className={`container ${!showOutlet ? 'hidden' : ''}`}>
                    <Outlet />
                </section>
            </main>
        </>
    );
}

export default GestionTasks;
