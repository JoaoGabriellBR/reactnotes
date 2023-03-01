import { createGlobalStyle } from "styled-components";
import { darkBlue, white } from "./colorProvider";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', 'Poppins';
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        background-color: ${darkBlue};
    }
`;
