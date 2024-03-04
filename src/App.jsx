/* eslint-disable no-mixed-spaces-and-tabs */
import "./App.css";
import { HText, Header } from "./compnents/header";
import ResponsiveSidebar from "./compnents/sidebar";
import { Wrapper } from "./compnents/wrapper";

function App() {
    return (
		<Wrapper>
			<Header>
				<HText>Welcome to our website!</HText>
            	<HText>Proyect nexus</HText>
			</Header>
			<ResponsiveSidebar />
        </Wrapper>
    );
}

export default App;
