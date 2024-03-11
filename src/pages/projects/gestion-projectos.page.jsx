/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { Button, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_projects } from "../../services/projects";
import CollapsibleTable from "../../compnents/projects/project-list";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

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

    useEffect(
        () => {
            if (actionClicked === "edit") {
                console.log("edit", idClicked);
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
    const handlerBack = ev => {
        ev.preventDefault();

        setShowOutlet(false);
        navigate(-1);
    }

    return (
        <>
            <Button variant="text" onClick={handlerBack}>
                <KeyboardArrowLeftIcon /> Back
            </Button>
            <main className='container'>
                
                <h1 className={`text-2xl font-bold text-center mb-4 ${showOutlet ? 'hidden' : ''}`}>Gestion de Projectos</h1>
                <section className={`container flex justify-between ${showOutlet ? 'hidden' : ''}`}>

                    <h2 className="text-left text-xl py-5 my-auto">Aqui podras gestionar tus projectos.</h2>
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

                <section className={`container ${showOutlet ? 'hidden' : ''}`} >
                    {
                        data && <CollapsibleTable
                            className="mb-3"
                            projects={data?.projects}
                            withActions={true}
                            setActionClicked={setActionClicked}
                            setIdClicked={setIdClicked}
                        />
                    }
                </section>

                <section className={`container ${!showOutlet ? 'hidden' : ''}`}>
                    <Outlet />
                </section>
            </main>
        </>
    );
};

export default GestionProjectos;
