import styled from "styled-components";

export const Container = styled.section`
  overflow-x: hidden;
  background: #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 25px;
  min-height: 550px;
  width: 85%;

  @media (max-width: 1000px) {
    margin-bottom: 25px;
  }

  .input-form {
    width: 70%;
    height: 55px;
    margin-bottom: 1.5rem;

    @media (max-width: 1000px){
      width: 100%;
    }
  }

  .atualizar-informacoes, .alterar-senha {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 2rem;

    @media (max-width: 1000px){
        width: 80%;
    }
  }
`;