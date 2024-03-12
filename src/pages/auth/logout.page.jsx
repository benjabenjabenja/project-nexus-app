import { redirect } from "react-router-dom";
import { logout } from "../../services/auth";

/* eslint-disable react-refresh/only-export-components */
export async function loader() {
    try {
        const storage = localStorage.getItem('userId');
        if (!storage) return "";
        const res = await logout({ id: "a052" });
        console.log({ res });
        res && localStorage.removeItem("userId");
        return redirect("/");
    } catch (e) {
        throw new Error(e.message);
    }
}
function LogoutPage() {
    return (<div className="container p-10 m-10 text-center"> `/// Cargando ///` </div>);
}

export default LogoutPage
