import enviroment from "../../enviroment";
import { generateUniqueId } from "../helpers/unique_id";

const __url_project = `${enviroment.mockapi_url}/projects`;

export const get_projects = async function() {
    const url = `${__url_project}`;
    const response = await fetch(url, { method: 'GET' });
    return await response.json();
}

export const create_project = async function ({ projectName, description, limitDate }) {

    try {
        const id = generateUniqueId();
        const response = await fetch(__url_project, {
            method: 'POST',
            body: JSON.stringify({
                projectName,
                description,
                limitDate,
                id,
                tasks: [],
                users: [],
                createdAt: new Date().toISOString()
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        return await response.json();
    } catch (e) {
        throw new Error("ERROR - [create project]: " + e.message);
    }
}

export const get_project_by_id = async function ({ id }) {
    try {
        const url = `${__url_project}/${id}`;
        const res = await fetch(url);
        return  await res.json();
    } catch (e) {
        throw new Error('ERROR - [get project by id]: ', e.message);
    }
}
export const update_project = async function ({ id, data }) {
    try {
        const url = `${__url_project}/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ id, ...data }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [update - project]: ' + e.message);
    }
}
export const delete_project = async function ({ id }) {
    try {
        const url = `${__url_project}/${id}`;
        const response = await fetch(url, { method: 'DELETE' });
        return response.json();
    } catch (e) {
        throw new Error('ERROR - [delete project] : ' + e.message); 
    }
}