/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useParams } from "react-router-dom";
import { isValidArray } from "../../helpers/validators";
import AlertErrorForm from "../../compnents/alert-error-form";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";

export async function action({ request }) {
    const errors = [];
    try {
        const fd = await request.formDate();
        const values = Object.fromEntries(fd);
        console.log({ values });
    } catch (e) {
        throw new Error(e.message);
    }
    return errors;
}

const FormConfirmarPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const params = useParams();
    const { id } = params;
    useEffect(
        () => {
            const confirm_account = async () => {
                // methodos para confirmar account
                console.log({ id });
            }
            confirm_account();
        },
        []
    );
    const handlerShowPassword = ev => {
        ev.preventDefault();

        setShowPassword(!showPassword);
    }
    return (
        <Form method="post">
            {/* input new_password */}
            <div className="flex items-center">
                <label className="text-left w-1/6" htmlFor="password"><strong>Nueva Contraseña </strong> </label>
                <input
                    className="block w-2/4 p-2 rounded-md"
                    type={showPassword ?  "text" : "password"}
                    name="password"
                    id="password"
                />
                <button
                    className="uppercase font-black ml-2 px-4 py-1 text-center text-slate-600"
                    type="button"
                    title={showPassword ? "ocultar" : "mostrar"}
                    onClick={handlerShowPassword}
                > {showPassword ? "ocultar" : "mostrar"}
                </button>
            </div>
            <button
                className="uppercase font-black my-2 px-4 py-3 rounded-md text-center sm:full md:w-2/3 hover:bg-slate-950 hover:text-slate-100 transition-colors"
                type="submit"
            >
                confirmar contraseña
            </button>
        </Form>
    );
}


function ConfirmAccountPage() {
    const errors = useActionData();
    return (
        <>
            <h1 className="text-6xl font-black px-2 py-10 text-slate-700">
				Reestablece tu contraseña y no pierdas el acceso a tus <span className="text-slate-950"> proyectos y tareas.</span>
			</h1>
            <WrapperContainerPages>
                {
                    isValidArray(errors) && <AlertErrorForm errors={errors} />
                }
                <FormConfirmarPassword />
				<nav className=" flex flex-col lg:flex-row lg:flex lg:justify-between lg:items-center">
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-0 mr-auto w-full mb-2 lg:w-1/2"
						to="/register"
					> registrate a nuestra web! </Link>
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-auto mr-0 w-full mb-2 lg:w-1/2"
						to="/login"
					> tienes una cuenta? Ingresá aqui </Link>

				</nav>
            </WrapperContainerPages>
        </>
    );
}

export default ConfirmAccountPage;
