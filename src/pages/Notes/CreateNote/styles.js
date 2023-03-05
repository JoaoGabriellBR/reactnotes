import styled from "styled-components";

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
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: 1000px){
    align-items: center;
    padding: 1rem 0 1rem 0;
  }

  .div-title {
    padding: 1rem 1rem 0 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

export const Input = styled.input`
  background: transparent;
  font-size: 25px;
  border: none;
  outline: 0;

`
