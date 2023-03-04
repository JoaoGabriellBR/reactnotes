import React, { useState } from "react";
import { Container, LeftBox, RightBox, Div, Form, LinkButton } from "./styles";
import Title from "components/Title/index";
import TextField from "@mui/material/TextField";
import Button from "components/Button/index";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "api/index";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const openLink = (link) => {
    navigate(link);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      const { token } = response?.data;
      Cookies.set("reactnotes_authtoken", token);
      openLink("/");
    } catch (e) {
      console.log(e.message);
      toast.error(e?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o seu e-mail"
                className="input-form"
                label="E-mail"
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a sua senha"
                className="input-form"
                label="Senha"
              />
              <Button
                disabled={!email || !password}
                type="button"
                onClick={handleLogin}
                width="50%"
              >
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
