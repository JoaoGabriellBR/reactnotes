import React from "react";
import Header from "components/Header/index";
import { Container } from "./styles";
import Title from 'components/Title/index';

function User() {
  return (
    <>
      <Header />
      <Container>
        <Title fontSize='25px' color='#000'>Olá, JOÃO GABRIEL!</Title>
      </Container>
    </>
  );
}

export default User;
