/* eslint-disable react-refresh/only-export-components */
import { Form, useActionData } from "react-router-dom";
import AlertErrorForm from "../../compnents/alert-error-form";
import { isValidArray } from "../../helpers/validators";
// import { get_user_by_id } from "../../services/users";
import { useState } from "react";

export async function loader() {
    return [];
}

export async function action({ request }) {
    const errors = [];
    try {
        const data = await request.formData();
        const new_password = Object.fromEntries(data);
        console.log({ new_password })
        // await get_user_by_id(id);
    } catch (e) {
        errors.push(e.message)
    }
    return errors;
}

function NewPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const errors = useActionData();

    const handlerShowPassword = ev => {
        ev.preventDefault();

        setShowPassword(!showPassword);
    }
    const handlerShowNewPassword = ev => {
        ev.preventDefault();

        setShowNewPassword(!showNewPassword);
    }
    
    return (
        <>
            { isValidArray(errors) && <AlertErrorForm errors={errors} /> }
            <Form method="post">
                {/* input new_password */}
                <div className="flex items-center">
					<label className="text-left w-1/6" htmlFor="password"><strong>Vieja Contraseña </strong> </label>
					<input
						className="block w-2/4 p-2 rounded-md"
						type={showPassword ?  "text" : "password"}
						name="password"
						id="password"
					/>
					<button
						className="uppercase font-black ml-2 px-4 py-1 text-center text-slate-600"
						type="button"
						title={showNewPassword ? "ocultar" : "mostrar"}
						onClick={handlerShowPassword}
					> {showPassword ? "ocultar" : "mostrar"}
					</button>
                </div>
                {/* inpout repetir new_password */}
                <div className="flex items-center">
					<label className="text-left w-1/6" htmlFor="password"><strong>Nueva Contraseña </strong> </label>
					<input
						className="block w-2/4 p-2 rounded-md"
						type={showNewPassword ?  "text" : "password"}
						name="password"
						id="password"
					/>
					<button
						className="uppercase font-black ml-2 px-4 py-1 text-center text-slate-600"
						type="button"
						title={showNewPassword ? "ocultar" : "mostrar"}
						onClick={handlerShowNewPassword}
					> {showNewPassword ? "ocultar" : "mostrar"}
					</button>
                </div>
                {/* button cambiar password */}
				<button
					className="uppercase font-black my-2 px-4 py-3 rounded-md text-center sm:full md:w-2/3 hover:bg-slate-950 hover:text-slate-100 transition-colors"
					type="submit"
				>
					cambiar contraseña
				</button>
			</Form>
        </>
    );
}

export default NewPasswordPage;
