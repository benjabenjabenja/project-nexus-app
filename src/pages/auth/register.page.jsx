/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { isValidArray } from "../../helpers/validators";
import AlertErrorForm from "../../compnents/alert-error-form";
import { register } from "../../services/auth";

export async function action({ request }) {
    let errors = [];
    try {

        const body = await request.formData();
        const values = Object.fromEntries(body);
        const { name, email, repeat_email, password, repeat_password, role } = values;

        if ([name, email, password].includes(""))
            errors.push("los campos son requeridos [ email, password, nombre ]");
        if ("".includes(repeat_email) || "".includes(email))
            errors.push("los emails son requeridos");
        if (email !== repeat_email)
            errors.push("los emails deben coincidir");
        if (password && "".includes(password))
            errors.push("la contraseña es requerida");
        if (repeat_password && "".includes(repeat_password))
            errors.push("el campo repetir contraseña es requerido");
        if (password !== repeat_password)
            errors.push("las contraseñas deben coincidir");
        if ("".includes(role)) errors.push("el rol es requerido");

        const user = {
            name,
            email,
            password,
            tasks: [],
            role,
            isLoged: false
        }
        const response = await register(user);
        return redirect("/");
    } catch (e) {
        errors.push(e.message);
    }
    return errors;
}

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [roles, setRoles] = useState([
        { value: "ADMIN", label: "admin" },
        { value: "DEVELOPER", label: "developer" },
        { value: "MANAGER", label: "manager" },                      
    ]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [repeatEmail, setrepeatEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [role, setRole] = useState('');

    const errors = useActionData();

    const handlerShowPassword = ev => {
		ev.preventDefault();
		setShowPassword(!showPassword);
    }
    const handlerShowRepeatPassword = ev => {
        ev.preventDefault();
        setShowRepeatPassword(!showRepeatPassword);
    }
    return (
        <>
            {
                isValidArray(errors) && <AlertErrorForm errors={errors} />
            }
            <Form method="post">
                {/* input nombre */}
                <div className="flex flex-col items-between gap-2 my-2">
                    <label className="block text-left" htmlFor="name"><strong> Nombre </strong> </label>
                    <input
                        className="p-2 rounded-md"
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                </div>
                {/* input email */}
                <div className="flex flex-col items-between gap-2 my-2">
                    <label className="block text-left" htmlFor="email"><strong> Email </strong> </label>
                    <input
                        className="p-2 rounded-md"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                {/* input repetir email */}
                <div className="flex flex-col items-between gap-2 my-2">
                    <label className="block text-left" htmlFor="repeat_email"><strong> Repetir Email </strong> </label>
                    <input
                        className="p-2 rounded-md"
                        type="email"
                        name="repeat_email"
                        id="repeat_email"
                        value={repeatEmail}
                        onChange={e => setrepeatEmail(e.target.value)}
                    />
                </div>
                {/* input password */}
                <div className="flex flex-col items-between gap-2 w-full my-2">
                    <label className="text-left w-full" htmlFor="password"><strong> Password </strong> </label>
                    <div className="flex items-center">
                        <input
                            className="block w-3/4 p-2 rounded-md"
                            type={showPassword ?  "text" : "password"}
                            name="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button
                            className="w-1/5 uppercase xs:text-sm sm:text-sm font-black ml-2 px-4 py-1 text-center text-slate-600"
                            type="button"
                            title={showPassword ? "ocultar" : "mostrar"}
                            onClick={handlerShowPassword}
                        > {showPassword ? "ocultar" : "mostrar"}
                        </button>
                    </div>
                </div>
                {/* input repetir passwrod */}
                <div className="flex flex-col items-between gap-2 w-full my-2">
                    <label className="text-left w-full" htmlFor="repeat_password">
                        <strong>Repetir Password </strong>
                    </label>
                    <div className="flex items-center">
                        <input
                            className="block w-3/4 p-2 rounded-md"
                            type={showRepeatPassword ? "text" : "password"}
                            name="repeat_password"
                            id="repeat_password"
                            value={repeatPassword}
                            onChange={ e => setRepeatPassword(e.target.value) }
                        />
                        <button
                            className="w-1/5 uppercase xs:text-sm sm:text-sm font-black ml-2 px-4 py-1 text-center text-slate-600"
                            type="button"
                            title={showRepeatPassword ? "ocultar" : "mostrar"}
                            onClick={handlerShowRepeatPassword}
                        > {showRepeatPassword ? "ocultar" : "mostrar"}
                        </button>
                    </div>
                </div>
                {/* input role */}
                <div className="flex flex-col items-between gap-2 w-full my-2">
                    <label className="text-left w-full" htmlFor="role">
                        <strong>Seleccionar Rol</strong>
                    </label>
                    <div className="flex items-center">
                        <select
                            onChange={e => setRole(e.target.value)}
                            className="block w-full p-2 rounded-md"
                            type="text"
                            name="role"
                            id="role"
                            >
                                <option value="" selected>-- SELECCIONAR ROL</option>
                                {
                                    roles.map((rol, i) => (
                                        <option key={i} value={rol.value}>{rol.label}</option>
                                    ))
                                }
                        </select>
                    </div>
                </div>
                {/* button registro */}
                <button
                    className="uppercase font-black my-2 px-4 py-3 rounded-md text-center sm:full md:w-2/3 hover:bg-slate-950 hover:text-slate-100 transition-colors"
                    type="submit"
                >
                    registrar
                </button>
            </Form>
        </>
    )
}

function RegisterPage() {
    return (
        <>
            <h1 className="text-6xl font-black px-2 py-10 text-slate-700">
                Registrate y <span className="text-slate-950">administra tus proyectos </span>
			</h1>
			<WrapperContainerPages>
				<RegisterForm />
				<nav className="flex flex-col lg:flex-row lg:flex lg:justify-between lg:items-center">
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-0 mr-auto w-full mb-2 lg:w-1/2"
						to="/"
					> ya tienes una cuenta? </Link>
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-auto mr-0 w-full mb-2 lg:w-1/2"
						to="/forgot-password"
					> cambiar contraseña ?</Link>

				</nav>
			</WrapperContainerPages>
		</>
    );
}

export default RegisterPage
