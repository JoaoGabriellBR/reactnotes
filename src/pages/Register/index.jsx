import React, { useState } from "react";
import { Container, LeftBox, RightBox, Div, Form, LinkButton } from "./styles";
import Title from "components/Title/index";
import TextField from "@mui/material/TextField";
import Button from "components/Button/index";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../api/index";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const openLink = (link) => navigate(link);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async () => {
    try {
      const response = await api({
        method: "POST",
        url: "/user",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          email: email,
          password: password,
        },
        json: true,
      });
      setName("");
      setEmail("");
      setPassword("");
      toast.success("Usuário cadastrado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
      navigate("/login");
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
                Criar conta
              </Title>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o seu nome"
                className="input-form"
                label="Nome"
              />
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
                type="button"
                mobile="100%"
                width="50%"
                disabled={!name || !email || !password}
                onClick={handleCreateUser}
              >
                Cadastrar
              </Button>
              <div className="entre">
                <p> Já tem uma conta?</p>
                <LinkButton onClick={() => openLink("/login")}>
                  Entre
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
