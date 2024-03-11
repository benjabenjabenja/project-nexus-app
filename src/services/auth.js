/* eslint-disable no-unused-vars */
import { redirect } from 'react-router-dom';
import enviroment from '../../enviroment';
import { generateUniqueId } from '../helpers/unique_id';
const __url_auth = `${enviroment.api_url}/users`

export const login = async ({ email, password }) => {
    try {
        const users = await get_usuarios();
        const find = users.find(user => user.email === email && password === user.password);
        if (find) {
            const user_loged = {
                ...find,
                token: generateUniqueId() + generateUniqueId(),
                isAutenticated: true
            }
            localStorage.setItem("userId", JSON.stringify(user_loged.id));
            return user_loged;
        }
        throw new Error('ERROR - usuario o contraseña incorrectos');
    } catch (e) {
        throw new Error('ERROR - [on login]: ' + e.message);
    }
};
export const forgot_password = async ({ email }) => {
    return [];
}
export const register = async function ({ user }) {
    try {
        const response = await fetch(__url_auth, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        });
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [on register]: ' + e.message);
    }
}

export const get_usuarios = async () => {
    try {
        const response = await fetch(__url_auth, { method: 'GET' });
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [on get usuarios]: ' + e.message);
    }
}