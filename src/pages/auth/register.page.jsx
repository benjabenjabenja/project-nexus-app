import { useState } from "react";
import WrapperContainerPages from "../../compnents/wrapper";
import { Link } from "react-router-dom";


const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const handlerShowPassword = ev => {
		ev.preventDefault();

		setShowPassword(!showPassword);
    }
    const handlerShowRepeatPassword = ev => {
        ev.preventDefault();

        setShowRepeatPassword(!showRepeatPassword);
    }
    return (
        <form>
			<div className="flex flex-col items-between gap-2 my-2">
				<label className="block text-left" htmlFor="name"><strong> Nombre </strong> </label>
				<input
					className="p-2 rounded-md"
					type="text"
					name="name"
					id="name"
				/>
            </div>
            <div className="flex flex-col items-between gap-2 my-2">
				<label className="block text-left" htmlFor="email"><strong> Email </strong> </label>
				<input
					className="p-2 rounded-md"
					type="email"
					name="email"
					id="email"
				/>
			</div>
            <div className="flex flex-col items-between gap-2 my-2">
				<label className="block text-left" htmlFor="email"><strong> Repetir Email </strong> </label>
				<input
					className="p-2 rounded-md"
					type="email"
					name="email"
					id="email"
				/>
			</div>
			<div className="flex flex-col items-between gap-2 w-full my-2">
                <label className="text-left w-full" htmlFor="password"><strong> Password </strong> </label>
                <div className="flex items-center">
                    <input
                        className="block w-3/4 p-2 rounded-md"
                        type={showPassword ?  "text" : "password"}
                        name="password"
                        id="password"
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
			<div className="flex flex-col items-between gap-2 w-full my-2">
                <label className="text-left w-full" htmlFor="password"><strong>Repetir Password </strong> </label>
                <div className="flex items-center">
                    <input
                        className="block w-3/4 p-2 rounded-md"
                        type={showRepeatPassword ?  "text" : "password"}
                        name="password"
                        id="password"
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
			<button
				className="uppercase font-black my-2 px-4 py-3 rounded-md text-center sm:full md:w-2/3 hover:bg-slate-950 hover:text-slate-100 transition-colors"
				type="submit"
			>
				login
			</button>
		</form>
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
				<nav className=" flex flex-col lg:flex-row lg:flex lg:justify-between lg:items-center">
					<Link
						className="text-md text-slate-400 hover:text-slate-950 rounded-md ml-0 mr-auto w-full mb-2 lg:w-1/2"
						to="/"
					> ya tienes una cuenta? </Link>
					<Link
						className="text-md text-slate-400 hover:text-slate-950 rounded-md ml-auto mr-0 w-full mb-2 lg:w-1/2"
						to="/forgot-password"
					> cambiar contraseña ?</Link>

				</nav>
			</WrapperContainerPages>
		</>
    );
}

export default RegisterPage
