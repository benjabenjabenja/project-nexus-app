/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import enviroment from "../../enviroment";
import { Link, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../compnents/header'
import { isValidArray } from "../helpers/validators";
import { generateUniqueId } from "../helpers/unique_id";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from "@mui/material";
import { ProjectProvider } from "../context/ProjectProvider";

const Wrapper = styled.div`
    background-color: #edede9;
    display: flex;
    flex-direction: column;
    flex: 1 1 320px;
    min-width: 100%;
    min-height: 100vh;
`;

function ProjectsLayout() {

    const location = useLocation();
    const navigate = useNavigate();
    
    const handlerBack = ev => {
        navigate(-1);
    }

    return (
        <Wrapper className="container bg-slate-300 md:min-h-screen">
            
            <Header className="shadow-md mb-4">
                <img height={'200px'} width={'auto'} src="/logo-nexus-project.png" alt="" />
                <nav className="min-w-full bg-slate-300 py-5 px-5 flex flex-auto gap-2">
                    <Link
                        to={"/projects"}
                        className={`px-3 py-2 text-white border border-transparent hover:border-slate-500 rounded-3xl hover:text-shadow-offset-y-2 transition__links
                            ${location.pathname === "/projects" ? 'bg-slate-500' : ''}`
                        }
                        >{ "Projects".toUpperCase() }</Link>
                    <Link
                        className="uppercase px-3 py-2 border text-white border-transparent hover:border-slate-500 hover:bg-slate-500 mr-0 ml-auto rounded-3xl transition__links"
                        to="/logout">Logout</Link>    
                </nav>
            </Header>

            <main className="bg-slate-50 rounded-md shadow-md px-5 py-10 mx-3 min-h-screen">
                <div className={`w-full mb-2 ${location.pathname === "/projects" ? 'hidden' : ''}`}>

                    <Button variant="text" onClick={handlerBack}>
                        <KeyboardArrowLeftIcon /> Back
                    </Button>
                </div>
                <ProjectProvider>
                    <Outlet />
                </ProjectProvider>
            </main>
        </Wrapper>
    )
}

export default ProjectsLayout;