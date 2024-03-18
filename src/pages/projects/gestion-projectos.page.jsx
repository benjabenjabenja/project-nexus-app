/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_projects } from "../../services/projects";
import CollapsibleTable from "../../compnents/projects/project-list";
import { ProjectProvider } from "../../context/ProjectProvider";
import { isValidArray } from "../../helpers/validators";
import useProjects from "../../hooks/useProjects.hooks";

export async function loader() {
    const projects = await get_projects();
    return { 
        projects: projects ?? []
    };
}

const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        margin: '0 auto',
        color: 'white'
    }
}

const GestionProjectos = () => {
    const data = useLoaderData();
    const [showOutlet, setShowOutlet] = useState(false);
    const [actionClicked, setActionClicked] = useState('');
    const [idClicked, setIdClicked] = useState('');
    const navigate = useNavigate();

    const { projects } = useProjects() || { projects: [] };

    console.log({projects, data})

    useEffect(
        () => {
            if (actionClicked === "edit") {
                setShowOutlet(true);
                navigate(`/projects/${idClicked}/edit`);
            }
        }, [actionClicked, idClicked]
    );

    const handlerCreateProject = ev => {
        ev.preventDefault();

        setShowOutlet(true);
        navigate("/projects/create-project");
    }

    return (
        <>
            <main className='container'>
                
                <h1 className={`text-2xl font-bold text-center mb-4`}>Gestion de Projectos</h1>
                <section className={`container flex justify-between`}>

                    <h2 className="text-left text-xl py-5 my-auto">Aqui podras gestionar tus proyectos.</h2>
                    <Fab
                        title="nav to /create-project"
                        onClick={handlerCreateProject}
                        classes={classes.customFab}
                        aria-label="add"
                        variant="extended"
                        size="medium"
                    >
                        <AddIcon sx={{ mr: 1 }} /> Add Project
                    </Fab>
                </section>
                {/* tabla de projectos */}
                <section className="container">
                    {
                        isValidArray(data?.projects) ? <CollapsibleTable
                            className="mb-3"
                            projects={data?.projects}
                            withActions={true}
                            setActionClicked={setActionClicked}
                            setIdClicked={setIdClicked}
                        /> :
                            <main className="p-5 mx-0 my-auto text-center font-black text-3xl">
                                No tienes projectos, crea uno!
                            </main>
                    }
                </section>
            </main>
        </>
    );
};

export default GestionProjectos;
