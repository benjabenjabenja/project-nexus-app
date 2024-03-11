/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import { Link, Outlet, useLocation } from "react-router-dom";
import { isValidArray } from "../helpers/validators";
import { generateUniqueId } from "../helpers/unique_id";
import { Header } from "../compnents/header";
/* import { get_routes } from "../services/routes"; */

/* export async function loader() {
    const routes = await get_routes();
    return routes || [];
} */

const WrapperOutlet = ({ children }) =>(
    <main className="container mx-auto mt-4 md:mt-10 flex justify-center">
        <div className="w-full lg:w-2/3">
            {children}
        </div>
    </main>
);

const Wrapper = styled.div`
    background-color: #edede9;
    display: flex;
    flex-direction: column;
    min-width: 100%;
    min-height: 100vh;
`;

function AuthLayout() {

    const menuItems = [];//useLoaderData();
    const location = useLocation();

    return (
        <Wrapper>
            <Header className="shadow-md mb-4">
                <img height={'200px'} width={'auto'} src="/logo-nexus-project.png" alt="" />
                <nav className="min-w-full bg-slate-200 py-5 px-5 flex flex-auto gap-2">
                {
					isValidArray(menuItems) && menuItems?.map((item) => (
						<Link
							to={item.url}
                            key={generateUniqueId()}
                            className={`px-3 py-2 text-white border border-transparent hover:border-slate-500 rounded-3xl hover:text-shadow-offset-y-2 transition__links ${location.pathname === item.url ? 'bg-slate-500' : ''}`}
						>
							{ item["view-id"].toUpperCase() }
						</Link>
					))
				}
                </nav>
            </Header>
            <WrapperOutlet>
                <Outlet />
            </WrapperOutlet>
        </Wrapper>
    )
}

export default AuthLayout
