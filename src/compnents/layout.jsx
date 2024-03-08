import styled from "styled-components";
import { Outlet } from 'react-router-dom';
import ResponsiveSidebar from './sidebar'
import { Header } from './header'

const Wrapper = styled.div`
    background-color: #edede9;
    display: flex;
    flex-direction: column;
    flex: 1 1 320px;
    min-width: 100%;
    min-height: 100vh;
`;

function Layout() {
    return (
        <Wrapper>
            <ResponsiveSidebar />
            <Header>
                <img src="/logo-nexus-project.png" alt="" />
            </Header>
            <main className="content">
                <Outlet />
            </main>
        </Wrapper>
    )
}

export default Layout;