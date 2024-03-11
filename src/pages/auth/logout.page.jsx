import { logout } from "../../services/auth";

/* eslint-disable react-refresh/only-export-components */
export async function loader() {
    const storage = localStorage.getItem('userId');
    if (!storage) return {};
    const responseLogout = await logout({ id: storage });
    console.log({ responseLogout });
    return [];
}
function LogoutPage() {
    
    return (<div></div>);
}

export default LogoutPage
