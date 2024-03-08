import styled from "styled-components";

export const Header = styled.header`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 250px;
    background-color: #d6ccc2;
    width: 100%;
    font-weight: 400;
    color: #212529;
    background-size: contain;
    background-position: center center;

    @media (min-width: 768px){
        flex-direction: row;
        height: 200px;
    }
`;