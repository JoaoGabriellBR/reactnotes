import React, { useState } from "react";
import { Container, LeftBox, RightBox, Div, Form, LinkButton } from "./styles";
import Title from "components/Title/index";
import TextField from "@mui/material/TextField";
import Button from "components/Button/index";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../api/index";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import ReactLoading from "react-loading";
import { inputFields } from "../../utils/inputFields";

export default function Register() {
  const navigate = useNavigate();
  const openLink = (link) => navigate(link);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleClearForm = () => {
    setFormData({ ...formData, name: "", email: "", password: "" });
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      await api({
        method: "POST",
        url: "/user",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        json: true,
      });
      setLoading(false);
      handleClearForm();
      toast.success("Usuário cadastrado com sucesso.", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
      openLink("/login");
    } catch (e) {
      setLoading(false);
      toast.error(e?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
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
              <Title marginBottom="35px" fontSize="2rem" color="#000">
                Criar conta
              </Title>

              {inputFields?.map((input) => (
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
                type="button"
                mobile="80%"
                width="50%"
                disabled={
                  !formData.name || !formData.email || !formData.password
                }
                onClick={handleCreateUser}
              >
                {loading ? (
                  <ReactLoading
                    color={"#fff"}
                    height={24}
                    width={24}
                    type="spin"
                  />
                ) : (
                  "Cadastrar"
                )}
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
