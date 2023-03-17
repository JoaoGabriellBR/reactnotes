import styled from "styled-components";

export const Container = styled.section`
  grid-area: container;
  background-color: #fff;

  .div-loading {
    width: 100%;
    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .div-title {
    padding: 0.5rem 1.4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      min-width: 50%;
    }

    .div-buttons {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      min-width: 50%;
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
