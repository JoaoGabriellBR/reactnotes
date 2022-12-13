import { createGlobalStyle } from "styled-components";
import { darkBlue, white } from "./colorProvider";

export const GlobalStyle = createGlobalStyle`
        html {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            overflow-x: hidden;
            background-color: ${darkBlue};
            color: #000;
            font-family: 'Roboto', 'Poppins';
            padding: 0;
            margin: 0;
            height: 100vh;
            box-sizing: border-box;
        }
`;
