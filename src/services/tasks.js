import enviroment from "../../enviroment"
const __url_tasks = `${enviroment.api_url}/tasks`;

export const get_tasks = async function () {
    try {
        const response = await fetch(__url_tasks, { method: 'GET' });
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [get tasks]: ' + e.message);
    }
};

export const get_task_by_id = async function({ id }) {
    try {
        const response = await fetch(`${__url_tasks}/${id}`, { method: 'GET' });
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [get task by id]: ' + e.message);
    }
};

export const create_task = async function ({ task }) {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(__url_tasks, options);
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [create task]: ' + e.message);
    }
};

export const updata_task = async function({ task }) {
    try {
        const options = {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(`${__url_tasks}/${task.id}`, options);
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [update task]: ' + e.message);
    }
}
export const delete_task = async function ({ id }) {
    try {
        const options = { method: 'DELETE' }
        const response = await fetch(`${__url_tasks}/${id}`, options);
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [delete task]: ' + e.message);
    }
}