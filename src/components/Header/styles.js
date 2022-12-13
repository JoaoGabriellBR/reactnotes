import styled from "styled-components";
import { darkBlue } from "styles/colorProvider";

export const StyledHeader = styled.header`
    background-color: ${darkBlue};
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 80px;
    padding-left: 80px;

    @media (max-width: 1000px) {
        padding-right: 40px;
        padding-left: 40px;
    }
`;

export const DivLogo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .logo {
        width: 20px;
        height: 20px;
    }
`;