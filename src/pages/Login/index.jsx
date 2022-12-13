import React from "react";
import Header from "components/HeaderHome/index";
import { Container, LeftBox, RightBox, Div, Form, LinkButton } from "./styles";
import Title from "components/Title/index";
import TextField from "@mui/material/TextField";
import Input from "components/Input/index";
import Button from "components/Button/index";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const openLink = (link) => {
    navigate(link);
  };

  return (
    <>
      <Container>
        <Div>
          <LeftBox>
            <img className="logo" src={logo} alt="Logo React Notes" />
          </LeftBox>

          <RightBox>
            <Form>
              <Title marginBottom="35px" fontSize="40px" color="#000">
                Acessar
              </Title>
              <TextField
                variant="standard"
                className="input-form"
                label="E-mail"
              />
              <TextField
                variant="standard"
                className="input-form"
                label="Senha"
              />
              <Button height="50px" width="50%">
                Entrar
              </Button>

              <div className="registrar">
                <p> Não possui uma conta?</p>
                <LinkButton onClick={() => openLink("/register")}>
                  Registrar
                </LinkButton>
              </div>
            </Form>
          </RightBox>
        </Div>
      </Container>
    </>
  );
}

export default Register;
