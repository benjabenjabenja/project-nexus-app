import enviroment from "../../enviroment";

export const get_routes = async () => {
    const url = `${enviroment.api_url}`;
    const routes = await fetch(`${url}/routes`);
    return routes.json();
}