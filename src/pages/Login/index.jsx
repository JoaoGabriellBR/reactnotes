import React, { useState } from "react";
import { Container, LeftBox, RightBox, Div, Form, LinkButton } from "./styles";
import Title from "components/Title/index";
import Button from "components/Button/index";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "api/index";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import ReactLoading from "react-loading";

export default function Login() {
  const navigate = useNavigate();

  const openLink = (link) => navigate(link);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post("/login", { email, password });
      const { token } = response?.data;
      Cookies.set("reactnotes_authtoken", token);
      console.log("TOKEN", token);
      setLoading(false);
      window.location.replace("/");
    } catch (e) {
      setLoading(false);
      toast.error("Usuário não encontrado", {
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
            <img
              className="logo"
              src={logo}
              alt="Logo React Notes"
              loading="lazy"
            />
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
                type="email"
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a sua senha"
                className="input-form"
                label="Senha"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? (
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
                disabled={!email || !password}
                type="button"
                onClick={handleLogin}
                width="50%"
              >
                {loading ? (
                  <ReactLoading
                    color={"#fff"}
                    height={24}
                    width={24}
                    type="spin"
                  />
                ) : (
                  "Entrar"
                )}
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
