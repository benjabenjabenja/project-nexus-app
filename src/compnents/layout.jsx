/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import enviroment from "../../enviroment";
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { Header } from './header'
import { isValidArray } from "../helpers/validators";
import { generateUniqueId } from "../helpers/unique_id";

export async function loader() {
    const url = enviroment.api_url;
    const router = await fetch(`${url}/routes`);
	const json = await router.json();
    return json || [];
}

const Wrapper = styled.div`
    background-color: #edede9;
    display: flex;
    flex-direction: column;
    flex: 1 1 320px;
    min-width: 100%;
    min-height: 100vh;
`;

function Layout() {
    const menuItems = useLoaderData();
    const location = useLocation();
    return (
        <Wrapper className="container bg-slate-300 md:min-h-screen">
            <Header className="shadow-md mb-4">
                <img height={'200px'} width={'auto'} src="/logo-nexus-project.png" alt="" />
                <nav className="min-w-full bg-slate-300 py-5 px-5 flex flex-auto gap-2">
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
            <main className="bg-slate-50 rounded-md shadow-md px-5 py-10 mx-3 min-h-screen">
                <Outlet />
            </main>
        </Wrapper>
    )
}

export default Layout;