import { createGlobalStyle } from "styled-components";
import { darkBlue, white } from "./colorProvider";

export const GlobalStyle = createGlobalStyle`
        html {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: ${darkBlue};
            color: ${white};
            font-family: 'Roboto', 'Poppins';
        }
`;