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

  .div-title {
    padding: 0.5rem 1.4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .title{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .div-editor {
    height: 100vh;
  }
`;

export const Input = styled.input`
  background: transparent;
  font-size: 25px;
  border: none;
  outline: 0;
`;
