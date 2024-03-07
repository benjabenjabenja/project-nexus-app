import styled from "styled-components";
import { Outlet } from 'react-router-dom';
import ResponsiveSidebar from './sidebar'
import {Header, HText} from './header'

const Wrapper = styled.div`
    background-color: #edede9;
    display: flex;
    flex-direction: column;
    flex: 1 1 320px;
    min-width: 100%;
    min-height: 100vh;
`;

export function Layout() {
    return (
        <Wrapper>
            <ResponsiveSidebar />
			<Header>
				<HText>Bienvenido a Proyect nexus</HText>
            </Header>
            <main className="content">
                <Outlet />
            </main>
        </Wrapper>
    )
}
