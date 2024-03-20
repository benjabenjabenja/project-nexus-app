/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_projects } from "../../services/projects";
import CollapsibleTable from "../../compnents/projects/project-list";
import { isValidArray } from "../../helpers/validators";
import useProjects from "./hooks/useProjects";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";
import useAuth from "../../hooks/useAuth";

const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        margin: '0 auto',
        color: 'white'
    }
}

const IndexProjects = () => {
    const [actionClicked, setActionClicked] = useState('');
    const [idClicked, setIdClicked] = useState('');
    const { projects, getProjects } = useProjects();
    const navigate = useNavigate();
    const { auth } = useAuth();
    useEffect(
        () => {
            actionClicked === "ver" && navigate(`/projects/${idClicked}`);
            actionClicked === "edit" && navigate(`/projects/${idClicked}/edit`);
        }, [actionClicked, idClicked]
    );
    
    // cargo la data a la store 
    useEffect(
        () => {
            (async () => {
                await getProjects();
            })();
        }, []
    );

    const handlerCreateProject = ev => {
        ev.preventDefault();

        navigate("/projects/create-project");
    }

    return (
        <>
            <WrapperContainerPages>
                
                <h1 className="text-2xl font-bold text-center mb-4"> Gestion de Projectos </h1>
                <section className="container flex justify-between">

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
                        isValidArray(projects) ? <CollapsibleTable
                            className="mb-3"
                            projects={projects}
                            withActions={auth?.role === "ADMIN"}
                            setActionClicked={setActionClicked}
                            setIdClicked={setIdClicked}
                        /> :
                            <main className="p-5 mx-0 my-auto text-center font-black text-3xl">
                                No tienes projectos, crea uno!
                            </main>
                    }
                </section>
                </WrapperContainerPages>
        </>
    );
};

export default IndexProjects;
