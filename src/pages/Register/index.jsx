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
import {AiOutlineUser} from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import ReactLoading from "react-loading";

export default function Register() {
  const navigate = useNavigate();
  const openLink = (link) => navigate(link);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          name: name,
          email: email,
          password: password,
        },
        json: true,
      });
      setLoading(false);
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
              <Title marginBottom="35px" fontSize="40px" color="#000">
                Criar conta
              </Title>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="input-form"
                type="text"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <AiOutlineUser />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
                          <MdOutlineVisibility size={21}/>
                        ) : (
                          <MdOutlineVisibilityOff size={21}/>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="button"
                mobile="80%"
                width="50%"
                disabled={!name || !email || !password}
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
