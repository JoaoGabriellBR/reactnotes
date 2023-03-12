import styled from "styled-components";

export const Container = styled.section`
  background-color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 1000px) {
    align-items: center;
  }

  .div-title {
    margin: 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 1000px) {
      margin-left: 2rem;
      justify-content: flex-start;
    }

    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 15px;
    }

    .div-buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;

      @media (max-width: 1000px) {
        margin-top: 1rem;
      }
    }
  }

  .div-editor {
    width: 100%;
  }

  .div-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .div-editor {
    width: ${(props) => props.width || "100%"};
  }
`;

export const Input = styled.input`
  background: transparent;
  font-size: 25px;
  border: none;
  outline: 0;
`;
