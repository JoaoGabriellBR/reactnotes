import { React, useState, useEffect } from "react";
import Header from "components/Header/index";
import Title from "components/Title/index";
import Button from "components/Button/index";
import { Container, GridContainer, WidgetArea } from "./styles";
import Cookies from "js-cookie";
import api from "../../api/index";
import { GrNotes } from "react-icons/gr";
import { darkBlue } from "styles/colorProvider";
import { useNavigate } from "react-router-dom";

function User() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const hours = new Date();

  const openLink = (link) => {
    navigate(link);
  };

  const loadUserData = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const Horas = () => {
    return hours >= 6 && hours < 12
      ? "Bom dia"
      : hours >= 12 && hours < 18
      ? "Boa Tarde"
      : "Boa Noite";
  };

  return (
    <>
      <GridContainer>
        <Header />
        <Container>
          {!loading && (
            <>
              <div className="div-title">
                <Title backgroundColor="red" fontSize="25px" color="#000">
                  {Horas()}, {userData?.name}!
                </Title>

                <Button onClick={() => openLink("/createnote")}>
                  + Nova nota
                </Button>
              </div>

              <WidgetArea>
                <div className="widget">
                  <div className="widget-icon">
                    <GrNotes style={{ color: darkBlue }} size={24} />
                  </div>
                  <div className="widget-body">
                    <p className="widget-title">5</p>
                    <p className="widget-subtitle">Notas</p>
                  </div>
                </div>
              </WidgetArea>

              <h1>Nota mais recente</h1>
              <WidgetArea>
                <div width="400px" className="widget">
                  <div className="widget-icon">
                    <GrNotes style={{ color: darkBlue }} size={24} />
                  </div>
                  <div className="widget-body">
                    <p className="widget-title">Título</p>
                    <p className="widget-subtitle">Conteúdo</p>
                  </div>
                </div>
              </WidgetArea>
            </>
          )}
        </Container>
      </GridContainer>
    </>
  );
}

export default User;
