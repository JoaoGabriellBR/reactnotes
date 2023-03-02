import styled from "styled-components";
import { darkBlue, white } from "styles/colorProvider";

export const GridContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "header header"
    "container container";

  min-height: 100vh;
`;

export const Container = styled.section`
  grid-area: container;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 1000px){
    align-items: center;
    padding: 1rem 0 1rem 0;
  }

  .div-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .div-editor {
     width: ${props => props.width || "100%"};
  }

`;
