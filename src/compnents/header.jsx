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

    @media (min-width: 768px){
        flex-direction: row;
        height: 200px;
        justify-content: space-between; 
    }
`;

export const HText = styled.h1`
    margin: 0 auto;
    padding: .5rem 2rem;
    text-align: center;
    font-size: 2rem;
    @media  (min-width: 768px) {
        padding: 2rem;
    }
`; 