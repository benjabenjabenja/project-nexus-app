/* eslint-disable react-refresh/only-export-components */

import { useLoaderData } from "react-router-dom";
import enviroment from "../../enviroment"
import { isValidArray } from "../helpers/validators";
/* import ProjectList from "../compnents/projects/project-list"; */
import CollapsibleTable from "../compnents/projects/project-list";

export async function loader() {
    const url = `${enviroment.api_url}/projects`;
    const projects = await fetch(url);
    const json = await projects.json();
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
