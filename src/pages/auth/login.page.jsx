/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export async function action() {
	return {}
}

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const handlerShowPassword = ev => {
		ev.preventDefault();

		setShowPassword(!showPassword);
	}
	return (
		<form>
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
				<label className="text-left w-1/6" htmlFor="password"><strong>  Password </strong> </label>
				<input
					className="block w-2/4 p-2 rounded-md"
					type={showPassword ?  "text" : "password"}
					name="password"
					id="password"
				/>
				<button
					className="uppercase font-black ml-2 px-4 py-1 rounded text-center text-slate-600 md:outline"
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
		</form>
	);
}

function LoginPage() {
	return (
		<>
			<h1 className="text-6xl font-black px-2 py-10 text-slate-700">
				Inicia sesión y <span className="text-slate-950">administra tus proyectos </span>
			</h1>
			<main className="bg-slate-200 px-5 py-10 text-center w-full">
				<LoginForm />
				<Link
					className="text-slate-400 hover:text-slate-950 rounded-md w-1/4 ml-0 mr-auto"
					to="/forgot-password"
				> has olvidado tu contrasenia ?</Link>
			</main>
		</>
	)
}

export default LoginPage
