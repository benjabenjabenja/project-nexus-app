/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Form, Link, Navigate, redirect, useActionData, useNavigate } from "react-router-dom";
import WrapperContainerPages from "../../compnents/wrapper-container-pages";
import { isValidArray, isValidObject } from "../../helpers/validators";
import { login } from "../../services/auth";
import AlertErrorForm from "../../compnents/alert-error-form";
import useAuth from "../../hooks/useAuth";

export async function action({ request }) {
	const errors = [];
	let success = {};
	try {
		const fd = await request.formData();
		const values = Object.fromEntries(fd);
		const { email, password } = values;

		const regexp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
	
		if (!regexp.test(email)) { errors.push('email no valido') }
		if("".includes(email)) { errors.push('email es requerido') }
		if ("".includes(password)) { errors.push('contraseña es requerida') }

		const responseLogin = await login({ email, password });
		responseLogin && (success = responseLogin);
		
	} catch (e) {
		errors.push(e.message);
	}
	return  [errors, success];
}

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const { setAuth, auth } = useAuth();
	const [errors, success] = useActionData() || [];
	const navigate = useNavigate();
	
	useEffect(() => {

		setShowAlert(isValidArray(errors));
		!showAlert && setAuth({ user: success });
		
		isValidObject(success) && navigate("/projects");
		
	}, [errors, success]);

	const handlerShowPassword = () => {
		setShowPassword(!showPassword);
	}


	return (
		<>
			{
				showAlert && <AlertErrorForm errors={errors || []} />
			}
			<Form method="post" className="mx-auto md:w-2/4">
				{/* input email */}
				<div className="flex items-center flex-col mb-2">
					<label className="text-left w-full" htmlFor="email">
						<strong> Email </strong>
					</label>
					<input
						className="block w-full p-2 rounded-md"
						type="email"
						name="email"
						id="email"
					/>
				</div>
				{/* input password */}
				<div className="flex items-start flex-col">
					<label className="text-left w-full" htmlFor="password"><strong> Password </strong> </label>
					<div className="container w-full flex">
						<input
							className="block w-2/3 p-2 rounded-md"
							type={showPassword ?  "text" : "password"}
							name="password"
							id="password"
						/>
						<button
							className="uppercase w-1/3 font-black my-auto px-4 py-1 text-center text-slate-600"
							type="button"
							title={showPassword ? "ocultar" : "mostrar"}
							onClick={handlerShowPassword}
						> {showPassword ? "ocultar" : "mostrar"}
						</button>
					</div>
				</div>
				{/* button login */}
				<input
					className="uppercase cursor-pointer block font-black my-2 w-full px-4 py-3 rounded-md text-center hover:bg-slate-950 hover:text-slate-100 transition-colors"
					type="submit"
					value="login"
				/>
			</Form>
		</>
	);
}

function LoginPage() {
	return (
		<>
			<h1 className="text-6xl font-black px-2 py-10 text-slate-700">
				Inicia sesión y administra <span className="text-slate-950"> tus proyectos </span>
			</h1>
			<WrapperContainerPages>
				<LoginForm />
				<nav className="flex flex-col items-center">
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-0 mr-auto w-full mb-2"
						to="/register"
					> registrate a nuestra web! </Link>
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-auto mr-0 w-full mb-2"
						to="/forgot-password"
					> cambiar contraseña ?</Link>
				</nav>
			</WrapperContainerPages>
		</>
	)
}

export default LoginPage
