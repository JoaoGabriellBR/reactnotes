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
import ReactLoading from "react-loading";

export default function Profile() {
  const [userData, setUserData] = useState([]);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false);

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
  });

  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChangeShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleChangeFormPassword = (e, field) => {
    setChangePassword({ ...changePassword, [field]: e.target.value });
  };

  const inputFields = [
    {
      id: "currentPassword",
      placeholder: "Digite a sua senha atual",
      label: "Senha atual",
      type: showPassword.currentPassword ? "text" : "password",
    },
    {
      id: "newPassword",
      placeholder: "Digite a sua nova senha",
      label: "Nova senha",
      type: showPassword.newPassword ? "text" : "password",
    },
  ];

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
    setLoadingUpdate(true);
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
      setLoadingUpdate(false);
      toast.success("Usuário atualizado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    } catch (e) {
      setLoadingUpdate(false);
      toast.error(e?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    }
  };

  const handleUpdatePassword = async () => {
    setLoadingUpdatePassword(true);
    try {
      await api({
        method: "PATCH",
        url: `/user/change-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("reactnotes_authtoken"),
        },
        data: {
          oldPassword: changePassword.currentPassword,
          newPassword: changePassword.newPassword,
        },
        json: true,
      });
      setLoadingUpdatePassword(false);
      toast.success("Senha atualizada com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    } catch (e) {
      setLoadingUpdatePassword(false);
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
          <Title marginBottom="2.1rem" fontSize="30px" color="#000">
            Meu Perfil
          </Title>

          <Title marginBottom="2.1rem" fontSize="30px" color="#000">
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
              {loadingUpdate ? (
                <ReactLoading
                  color={"#fff"}
                  height={24}
                  width={24}
                  type="spin"
                />
              ) : (
                "Atualizar informações"
              )}
            </Button>
          </div>

          <Title marginBottom="35px" fontSize="30px" color="#000">
            Alterar Senha
          </Title>

          <div className="alterar-senha">
            {inputFields?.map((input) => (
              <TextField
                value={changePassword[input.id]}
                onChange={(e) => handleChangeFormPassword(e, input.id)}
                placeholder={input.placeholder}
                label={input.label}
                type={input.type}
                className="input-form"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleChangeShowPassword(input?.id)}
                      >
                        {showPassword[input?.id] === true ? (
                          <MdOutlineVisibility />
                        ) : (
                          <MdOutlineVisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ))}

            <Button
              disabled={
                !changePassword.currentPassword && !changePassword.newPassword
              }
              type="button"
              onClick={handleUpdatePassword}
              width="50%"
            >
              {loadingUpdatePassword ? (
                <ReactLoading
                  color={"#fff"}
                  height={24}
                  width={24}
                  type="spin"
                />
              ) : (
                "Alterar senha"
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
