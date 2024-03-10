/* eslint-disable react-refresh/only-export-components */

import { useLoaderData } from "react-router-dom";
import { isValidArray } from "../helpers/validators";
/* import ProjectList from "../compnents/projects/project-list"; */
import CollapsibleTable from "../compnents/projects/project-list";
import { get_projects } from "../services/projects";

export async function loader() {
    const json = await get_projects();
    return json || [];
}

const Home = () => {
    const projects = useLoaderData();
    return (
        <>
            <h1 className="font-black text-2xl p-4 text-center">Projects</h1>
            {
                isValidArray(projects) ?
                    <CollapsibleTable projects={projects} /> :

                    <p className="p-10 text-center m-auto">No hay proyectos disponibles.</p>
            }
        </>
    );
}

export default Home;
