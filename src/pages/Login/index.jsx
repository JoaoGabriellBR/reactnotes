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
import { inputFields } from "utils/inputFields";

export default function Login() {
  const navigate = useNavigate();
  const openLink = (link) => navigate(link);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api({
        method: "POST",
        url: "/login",
        data: {
          email: formData.email,
          password: formData.password,
        },
      });
      const { token } = response?.data;
      Cookies.set("reactnotes_authtoken", token);
      setLoading(false);
      openLink("/");
    } catch (e) {
      setLoading(false);
      const errorMessage =
        e?.response?.data?.error || "Não foi possível realizar o login.";
      toast.error(errorMessage, {
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
              <Title marginBottom="35px" fontSize="2rem" color="#000">
                Login
              </Title>

              {inputFields?.slice(1).map((input) => (
                <TextField
                  value={formData[input.id]}
                  onChange={(e) => handleChange(e, input.id)}
                  placeholder={input.placeholder}
                  type={
                    input.id === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : input.type
                  }
                  className="input-form"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>{input.icon}</IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: input.id === "password" && (
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
              ))}

              <Button
                disabled={!formData.email || !formData.password}
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
