/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import WrapperContainerPages from "../../compnents/wrapper";

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
		</form>
	);
}

function LoginPage() {
	return (
		<>
			<h1 className="text-6xl font-black px-2 py-10 text-slate-700">
				Inicia sesión y <span className="text-slate-950">administra tus proyectos </span>
			</h1>
			<WrapperContainerPages>
				<LoginForm />
				<nav className=" flex flex-col lg:flex-row lg:flex lg:justify-between lg:items-center">
					<Link
						className="text-md text-slate-400 hover:text-slate-950 rounded-md ml-0 mr-auto w-full mb-2 lg:w-1/2"
						to="/register"
					> registrate a nuestra web! </Link>
					<Link
						className="text-md text-slate-400 hover:text-slate-950 rounded-md ml-auto mr-0 w-full mb-2 lg:w-1/2"
						to="/forgot-password"
					> cambiar contraseña ?</Link>

				</nav>
			</WrapperContainerPages>
		</>
	)
}

export default LoginPage
