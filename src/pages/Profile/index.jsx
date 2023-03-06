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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const toastSuccess = () => {
    return toast.success("Senha atualizada com sucesso!", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };

  const toastError = () => {
    return toast.error("Não foi possível atualizar a senha", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };

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

  const handleUpdateUser = async () => {
    try {
      await api({
        method: "PATCH",
        url: `/user`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("reactnotes_authtoken"),
        },
        data: {
          name: userData?.name,
          email: userData?.email,
        },
        json: true,
      });
      toast.success("Usuário atualizado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      await api({
        method: "PATCH",
        url: `/user/change-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("reactnotes_authtoken"),
        },
        data: {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        json: true,
      });
      toastSuccess();
    } catch (e) {
      toastError();
    }
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
              focused={userData?.name !== null}
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
              disabled={!userData?.name || !userData?.email}
              type="button"
              onClick={handleUpdateUser}
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Digite a sua senha atual"
              className="input-form"
              label="Senha atual"
            />

            <TextField
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite a sua nova senha"
              className="input-form"
              label="Nova senha"
            />
            <Button
              disabled={!currentPassword && !newPassword}
              type="button"
              onClick={handleChangePassword}
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
