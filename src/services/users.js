import enviroment from "../../enviroment";

const __url_base = `${enviroment.api_url}/users`

export const get_users = async () => {
    try {
        const response = await fetch(__url_base, { method: 'GET' });
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [on get users]: ' + e.message);
    }
}

export const get_user_by_id = async ({id}) => {
    try {
        const response = await fetch(`${__url_base}/${id}`.trim() , { method:'GET' });
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [on get user by id]: ' + e.message);
    }
}

export const create_user = async (user) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }
        const response = await fetch(__url_base, options);
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [on create user]: ' + e.message);
    }
}

export const update_user = async (user) => {
    try {
        const options = {
            method: "PUT",
            headers:{
              'Content-Type':'application/json'
            }, 
            body: JSON.stringify(user)
        }
        const response = await fetch(`${__url_base}/${user.id}`, options);
        return await response.json();
    } catch (e) {
        throw new Error("ERROR - [on update user]: " + e.message);
    }
}