import enviroment from "../../enviroment";
import { generateUniqueId } from "../helpers/unique_id"

export const create_project = async function ({ projectName, description, limitDate }) {

    try {
        const id = generateUniqueId();
        const response = await fetch(`${enviroment.api_url}/projects`, {
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