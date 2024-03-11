/* eslint-disable react-refresh/only-export-components */
import { Form, Link, useActionData } from "react-router-dom";
import WrapperContainerPages from "../../compnents/wrapper";
import { isValidArray } from "../../helpers/validators";
import { forgot_password } from "../../services/auth";
import AlertErrorForm from '../../compnents/alert-error-form';

export async function action({ request }) {
	const errors = [];
	try {
		const fd = await request.formData();
		const values = Object.fromEntries(fd);
		const { email } = values;
		const regexp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
		if (!regexp.test(email)) { errors.push('email no valido') }
		if("".includes(email)) { errors.push('email es requerido') }
		const loginResponse = await forgot_password({ email });
        console.log({ loginResponse });
		// TODO: redirect to /home
		return;
	} catch (e) {
		errors.push(e.message);
	}
	return errors || [];
}

const ForgotPasswordForm = () => {
	const errors = useActionData();
    return (
        <>
            {
				isValidArray(errors) &&
                <AlertErrorForm errors={errors} />
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
				<button
					className="uppercase font-black my-2 px-4 py-3 rounded-md text-center sm:full md:w-2/3 hover:bg-slate-950 hover:text-slate-100 transition-colors"
					type="submit"
				>
					recuperar contraseña
				</button>
			</Form>
        </>
    )
}

function ForgotPasswordPage() {
    return (
        <>
            <h1 className="text-6xl font-black px-2 py-10 text-slate-700">
				Recuperá la cuenta y administra tus <span className="text-slate-950"> proyectos y tareas.</span>
			</h1>
            <WrapperContainerPages>
                <ForgotPasswordForm />
				<nav className=" flex flex-col lg:flex-row lg:flex lg:justify-between lg:items-center">
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-0 mr-auto w-full mb-2 lg:w-1/2"
						to="/register"
					> registrate a nuestra web! </Link>
					<Link
						className="uppercase text-md text-slate-400 hover:text-slate-950 rounded-md ml-auto mr-0 w-full mb-2 lg:w-1/2"
						to="/forgot-password"
					> tienes una cuenta? Ingresá aqui </Link>

				</nav>
            </WrapperContainerPages>
        </>
    );
}

export default ForgotPasswordPage;
