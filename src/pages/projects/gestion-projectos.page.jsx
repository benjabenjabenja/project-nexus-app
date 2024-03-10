/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { get_projects } from "../../services/projects";
import CollapsibleTable from "../../compnents/projects/project-list";

export async function loader() {
    const projects = await get_projects();
    return { 
        projects: projects ?? []
    };
}

const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        color: 'white'
    }
}

const GestionProjectos = () => {
    const data = useLoaderData();
    const [showContainer, setShowContainer] = useState(false);
    const navigate = useNavigate();
    console.log({ data });

    const handlerCreateProject = ev => {
        ev.preventDefault();

        setShowContainer(!showContainer);
        navigate("/projects/create-project");
    }

    return (
        <>
            <main className={`container ${showContainer ? 'hidden' : ''}`} >
                <h1 className="text-2xl font-bold text-center">Gestion de Projectos</h1>
                <p className="text-left py-5">Aqui podras gestionar tus projectos.</p>

                <div className="container">
                    {
                       data && <CollapsibleTable className="mb-3" withActions={true} projects={data?.projects} /> 
                    }
                </div>
                {/* Boton para crear un proyecto */}
            </main>
            <div className={`container mt-2 ${showContainer ? 'hidden' : ''}`}>
                <Fab title="nav to /create-project" onClick={handlerCreateProject} classes={classes.customFab} aria-label="add" variant="extended" size="medium">
                    <AddIcon sx={{ mr: 1 }} />
                    add project
                </Fab>
            </div>
            <div className={`mt-3 ${!showContainer ? 'hidden' : ''}`}>
                <Outlet />
            </div>
        </>
    );
};

export default GestionProjectos;
