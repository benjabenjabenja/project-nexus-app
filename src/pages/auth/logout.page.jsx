/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { isValidObject } from "../../helpers/validators";

/* eslint-disable react-refresh/only-export-components */
export async function loader(params) {
    const errors = []
    try {
        const storage = localStorage.getItem('user') ?? {};
        const parsedData = JSON.parse(storage);
        if (isValidObject(parsedData)) {
            const { id } = parsedData; 
            const response = await logout({ id });
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            return [errors, response];
        }
        return redirect("/");
    } catch (e) {
        throw new Error(e.message);
    }
}
function LogoutPage() {
    const [errors, success] = useLoaderData() || [];
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(
        () => {
            setAuth({});
            navigate("/");
        }, [errors, success]
    );

    return (<div className="container p-10 m-10 text-center"> `/// Cargando ///` </div>);
}

export default LogoutPage
