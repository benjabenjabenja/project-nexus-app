/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { generateUniqueId } from "../helpers/unique_id";
import { isValidArray } from "../helpers/validators";
import enviroment from "../../enviroment";
import { useLoaderData } from "react-router-dom";

const Sidebar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ isOpen }) => (isOpen ? "250px" : "60px")};
    background-color: #333;
    transition: width 0.3s ease;
    opacity: 0.8;
`;
const ToggleButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    font-size: 1.3rem;
    cursor: pointer;
    padding: 1.3rem;
`;
const Icon = styled.div`
    font-size: ${({ isOpen }) => (isOpen ? "20px" : "16px")};
    transition: font-size 0.3s ease;
`;

const MenuItem = styled.a`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    text-decoration: none;
    margin: 0.5rem 2.3rem;
    padding: 0.5rem;
    color: white;
    width: ${({ isOpen }) => (isOpen ? "calc(250px - 3.5rem)" : "60px")};
    transition: width 0.3s ease;
    border: 1px solid transparent;
    :hover {
        border: 1px solid white;
        border-radius: 5px;
    }
`;

const BoxItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
`;

export async function loader() {
    const url = enviroment.api_url;
    const router = await fetch(`${url}/routes`);
	const json = await router.json();
    return json || [];
}

function ResponsiveSidebar() {
    const [isOpen, setIsOpen] = useState(
        window.innerWidth <= 786 ? false : true
    );
	const menuItems = useLoaderData();

    const toggleMenu = (ev) => {
        ev.preventDefault();
        setIsOpen(!isOpen);
	};
	console.log({ menuItems })
    return (
        <Sidebar isOpen={isOpen}>
            <ToggleButton onClick={toggleMenu}>
                <Icon isOpen={isOpen}>
                    <FaBars />
                </Icon>
            </ToggleButton>
            <BoxItem className="container__items__menu">
				{
					isValidArray(menuItems) && menuItems?.map((item) => (
						<MenuItem
							isOpen={isOpen}
							href="/create-project"
							key={generateUniqueId()}
						>
							{ item["view-id"].toUpperCase() }
						</MenuItem>
					))
				}
            </BoxItem>
        </Sidebar>
    );
}
export default ResponsiveSidebar;
