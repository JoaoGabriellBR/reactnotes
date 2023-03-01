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
  padding: 0 5rem 1rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1000px){
    align-items: center;
    padding: 1.5rem;
  }

  .div-title {
    width: 100%;
    min-height: 10rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 1000px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
  }

  .div-editor {
    width: 100%;
  }

  .input-title {
    width: 30%;
    min-height: 40%;
    font-size: 15px;
    font-weight: 500;
    background: transparent;
    border: none;
    border-bottom: 1px solid ${darkBlue};
    outline: none;

    @media (max-width: 1000px){
        width: 100%;
        margin-bottom: 15px;
    }
  }
`;
