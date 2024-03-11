/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import WrapperContainerPages from "../../compnents/wrapper";
import { isValidArray } from "../../helpers/validators";
import { generateUniqueId } from "../../helpers/unique_id";
import { login } from "../../services/auth";

export async function action({ request }) {
	const errors = [];
	try {

		const fd = await request.formData();
		const values = Object.fromEntries(fd);
		const { email, password } = values;
		const regexp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
		if (!regexp.test(email)) { errors.push('email no valido') }
		if("".includes(email)) { errors.push('email es requerido') }
		if ("".includes(password)) { errors.push('contraseña es requerida') }
		const loginResponse = await login({ email, password });
		if (loginResponse) return redirect("/home");
		// TODO: redirect to /home
		return;
	} catch (e) {
		errors.push(e.message);
	}
	return errors || [];
}

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const errors = useActionData();
	console.log({ errors });
	
	const handlerShowPassword = ev => {
		ev.preventDefault();
		setShowPassword(!showPassword);
	}
	return (
		<>
			{
				isValidArray(errors) &&
				<div className="container mb-4 px-3 py-2 bg-red-700 rounded-md">
					{
						errors.map(error => <p className="py-1 text-slate-50" key={generateUniqueId()}>{error}</p>)
					}
				</div>
			}
			<Form method="post">
				<div className="flex items-center mb-2">
					<label className="text-left w-1/6" htmlFor="email"><strong> Email </strong> </label>
					<input
						className="block w-2/3 p-2 rounded-md"
						type="email"
						name="email"
						id="email"
					/>
				</div>
				<div className="flex items-center">
					<label className="text-left w-1/6" htmlFor="password"><strong> Password </strong> </label>
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
					login
				</button>
			</Form>
		</>
	);
}

function LoginPage() {
	return (
		<>
			<h1 className="text-6xl font-black px-2 py-10 text-slate-700">
				Inicia sesión y <span className="text-slate-950">administra tus proyectos y tareas</span>
			</h1>
			<WrapperContainerPages>
				<LoginForm />
				<nav className=" flex flex-col lg:flex-row lg:flex lg:justify-between lg:items-center">
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-0 mr-auto w-full mb-2 lg:w-1/2"
						to="/register"
					> registrate a nuestra web! </Link>
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-auto mr-0 w-full mb-2 lg:w-1/2"
						to="/forgot-password"
					> cambiar contraseña ?</Link>

				</nav>
			</WrapperContainerPages>
		</>
	)
}

export default LoginPage
