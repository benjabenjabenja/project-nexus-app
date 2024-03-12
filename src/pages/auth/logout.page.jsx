/* eslint-disable react-hooks/exhaustive-deps */
import { redirect, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { useEffect } from "react";

/* eslint-disable react-refresh/only-export-components */
export async function loader() {
    try {
        const storage = localStorage.getItem('userId');
        if (!storage) return "";
        const res = await logout({ id: "a052" });
        res && localStorage.removeItem("userId");
        return redirect("/");
    } catch (e) {
        throw new Error(e.message);
    }
}
function LogoutPage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/")
    }, []);
    return (<div className="container p-10 m-10 text-center"> `/// Cargando ///` </div>);
}

export default LogoutPage
