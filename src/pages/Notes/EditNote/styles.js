import styled from "styled-components";

export const Container = styled.section`
  background-color: #fff;
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

    @media (max-width: 1000px){
      margin: 1rem 0 1rem 0;
    }

    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 15px;
    }

    .div-buttons{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
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
