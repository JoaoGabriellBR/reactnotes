import React, { useState, useEffect } from "react";
import { Container, Form } from "./styles";
import Title from "components/Title/index";
import TextField from "@mui/material/TextField";
import Header from "components/Header/index";
import Button from "components/Button/index";
import api from "api/index";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";

export default function Profile() {
  const [userData, setUserData] = useState([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
        autoClose: 2000,
      });
    } catch (e) {
      toast.error(e?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
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
      toast.success("Senha atualizada com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    } catch (e) {
      toast.error(e?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
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
              type={showCurrentPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showCurrentPassword ? (
                        <MdOutlineVisibility />
                      ) : (
                        <MdOutlineVisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite a sua nova senha"
              className="input-form"
              label="Nova senha"
              type={showNewPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowNewPassword(!showNewPassword)
                      }
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showNewPassword ? (
                        <MdOutlineVisibility />
                      ) : (
                        <MdOutlineVisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
