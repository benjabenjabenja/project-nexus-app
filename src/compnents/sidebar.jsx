import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ isOpen }) => (isOpen ? '250px' : '60px')};
  background-color: #333;
  transition: width 0.3s ease;
  opacity: .8;
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
  font-size: ${({ isOpen }) => (isOpen ? '20px' : '16px')};
  transition: font-size 0.3s ease;

`;

function ResponsiveSidebar() {
    const [isOpen, setIsOpen] = useState(window.innerWidth <= 786 ? false : true);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <Sidebar isOpen={isOpen}>
        <ToggleButton onClick={toggleMenu}>
          <Icon isOpen={isOpen}>
            <FaBars />
          </Icon>
        </ToggleButton>
        {/* Agrega aquí el resto de tu contenido del menú */}
      </Sidebar>
    );
}
export default ResponsiveSidebar;