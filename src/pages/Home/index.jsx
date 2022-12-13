import React from "react";
import Header from "components/HeaderHome/index";
import { Container, Div, LinkButton } from "./styles";
import Title from "components/Title/index.jsx";
import Subtitle from "components/Subtitle/index.jsx";
import Button from "components/Button/index.jsx";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const openLink = (link) => {
    navigate(link);
  };

  return (
    <>
      <Header />
      <Container>
        <Div>
          <Title marginBottom="20px" fontSize="60px">
            Domine seu trabalho, organize sua vida
          </Title>

          <Subtitle fontSize="22px">
            Lembre-se de tudo e enfrente cada projeto com suas notas, tarefas e
            calendário, tudo no mesmo lugar.
          </Subtitle>

          <Button
            outlined
            width="200px"
            marginTop="20px"
            onClick={() => openLink("/register")}
          >
            CADASTRE-SE
          </Button>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              color: "#fff",
            }}
          >
            <p> Já tem uma conta?</p>
            <LinkButton onClick={() => openLink("/login")}>Entre</LinkButton>
          </div>
        </Div>
      </Container>
    </>
  );
}

export default Home;
