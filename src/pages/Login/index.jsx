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
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
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
      const response = await api({
        method: "POST",
        url: "/login",
        data: {
          email: email,
          password: password,
        },
      });
      const { token } = response?.data;
      Cookies.set("reactnotes_authtoken", token);
      setLoading(false);
      window.location.replace("/");
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.error, {
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
            <Form onKeyDown={(e) => e.key === "Enter" && handleLogin()}>
              <Title marginBottom="2.1rem" fontSize="2rem" color="#000">
                Login
              </Title>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="input-form"
                type="email"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <HiOutlineMail />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="input-form"
                type={showPassword ? "text" : "password"}
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <BiLock />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? (
                          <MdOutlineVisibility size={21} />
                        ) : (
                          <MdOutlineVisibilityOff size={21} />
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
                mobile="80%"
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
