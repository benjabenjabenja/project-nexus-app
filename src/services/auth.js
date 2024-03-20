/* eslint-disable no-unused-vars */
import enviroment from '../../enviroment';
import { generateUniqueId } from '../helpers/unique_id';
import { get_user_by_id, get_users, update_user } from './users';
const __url_auth = `${enviroment.api_url}/users`;

export const login = async ({ email, password }) => {
    try {
        const users = await get_users();
        const find = users.find((user) => user.email === email && password.toLowerCase() === user.password.toLowerCase());
        if (find) {
            find.token = generateUniqueId() + generateUniqueId();
            find.isLoged = true;

            const set_user_response = await update_user(find);

            localStorage.setItem("userId", JSON.stringify(set_user_response.id));
            localStorage.setItem("user", JSON.stringify(set_user_response));

            return set_user_response ? set_user_response : null;
        }
        throw new Error('ERROR - [on login]: usuario o contraseña incorrectos');
    } catch (e) {
        throw new Error(e.message);
    }
};
export const logout = async ({ id }) => {
    try {
        const user_by_id = await get_user_by_id({ id });
        const user_set = {
            ...user_by_id,
            isLoged: false,
            token: ""
        };
        const response = await update_user(user_set);
        return response;
    } catch (e) {
        throw new Error('ERROR - [on  logout]: ' + e.message);
    }
};
export const forgot_password = async ({ email }) => {
    try {
        const response = await get_user_by_id(email);
        return await response.json();
    } catch (e) {
        throw new Error("ERROR - [on forgot password]: " + e.message);
    }
};

export const change_password = async (user) => {
    try {
        const response = await update_user(user);
        return await response.json();
    } catch (e) {
        throw new Error("ERROR - [on change password]: "+ e.message);
    }
}

export const register = async function (user) {
    try {
        const response = await fetch(__url_auth, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [on register]: ' + e.message);
    }
};