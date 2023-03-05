import React, { useState, useEffect } from "react";

import { Container, LeftBox, RightBox, Div, Form } from "./styles";
import Title from "components/Title/index";
import TextField from "@mui/material/TextField";
import Header from "components/Header/index";
import Button from "components/Button/index";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "api/index";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();

  const openLink = (link) => {
    navigate(link);
  };

  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const loadUserData = async () => {
    const response = await api({
      method: "GET",
      url: `/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("reactnotes_authtoken"),
      },
      json: true,
    });
    setUserData(response.data);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Form>
          <Title marginBottom="35px" fontSize="30px" color="#000">
            Meu Perfil
          </Title>

          <Title marginBottom="35px" fontSize="30px" color="#000">
            Dados Pessoais
          </Title>

          <div className="atualizar-informacoes">
            <TextField
              value={userData?.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              placeholder="Digite o seu nome"
              className="input-form"
              label="Nome"
              focused={userData.name !== null}
            />
            <TextField
              value={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Digite o seu e-mail"
              className="input-form"
              label="E-mail"
              focused={userData?.email !== null}
            />

            <Button
              disabled={!userData?.email || !userData?.password}
              type="button"
              // onClick={handleLogin}
              width="50%"
            >
              Atualizar informações
            </Button>
          </div>

          <Title marginBottom="35px" fontSize="30px" color="#000">
            Alterar Senha
          </Title>

          <div className="alterar-senha">
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a sua senha atual"
              className="input-form"
              label="Senha atual"
            />

            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a sua nova senha"
              className="input-form"
              label="Nova senha"
            />
            <Button
              disabled={!password && !newPassword}
              type="button"
              // onClick={handleLogin}
              width="50%"
            >
              Alterar senha
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
