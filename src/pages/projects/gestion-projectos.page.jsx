/* eslint-disable no-unused-vars */
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        color: 'white'
    }
}


const GestionProjectos = () => {
    const [showContainer, setShowContainer] = useState(false);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();


    const handlerClick = ev => {
        ev.preventDefault();
        setShowContainer(!showContainer);
        navigate("/projects/create-project");
    }

    return (
        <>
            <main className={`container ${showContainer ? 'hidden' : ''}`} >
                <h1>Gestion de Projectos</h1>
                <p className="pb-4">Aqui podras gestionar tus projectos.</p>
                <Fab title="nav to /create-project" onClick={handlerClick} classes={classes.customFab} aria-label="add" variant="extended" size="medium">
                    <AddIcon sx={{ mr: 1 }} />
                    add project
                </Fab>
            </main>
            <div className={`mt-3 ${!showContainer ? 'hidden' : ''}`}>
                <Outlet />
            </div>
        </>
    );
};

export default GestionProjectos;
