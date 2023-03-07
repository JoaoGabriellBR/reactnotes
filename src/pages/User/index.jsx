import { React, useState, useEffect } from "react";
import Header from "components/Header/index";
import Title from "components/Title/index";
import { Container, GridContainer, Widget } from "./styles";
import Cookies from "js-cookie";
import api from "../../api/index";
import { useNavigate } from "react-router-dom";
import createNote from "../../assets/createnote.png";
import moment from "moment";

function User() {
  const [userData, setUserData] = useState();
  const [noteData, setNoteData] = useState([]);

  const navigate = useNavigate();

  const openLink = (link) => {
    navigate(link);
  };

  const Greetings = () => {
    const now = moment();
    const hour = now.hour();
  
    let greeting;
    if (hour >= 5 && hour < 12) {
      greeting = "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Boa tarde";
    } else {
      greeting = "Boa noite";
    }
  
    return greeting;
  }

  const formatedDate = (date) => {
    return moment(date).format("DD/MM/YYYY HH:mm");
  };

  const loadNoteData = async () => {
    const response = await api({
      method: "GET",
      url: "/notes",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("reactnotes_authtoken"),
      },
      json: true,
    });

    setNoteData(response.data.response);
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

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    loadNoteData();
  }, []);

  return (
    <>
      <GridContainer>
        <Header />
        <Container>
          <>
            <div className="div-title">
              <Title backgroundColor="red" fontSize="25px" color="#000">
                {Greetings()}, {userData?.name}!
              </Title>
            </div>

            <div className="div-main">
              <Widget onClick={() => openLink("/createnote")}>
                <div className="widget-create-note">
                  <img
                    width="70px"
                    height="70px"
                    src={createNote}
                    alt="Criar nova nota"
                  />
                  <p>Criar nova nota</p>
                </div>
              </Widget>

              {noteData?.map((note) => (
                <Widget
                  onClick={() => openLink(`/editnote/${note.id}`)}
                  // padding="0 1rem 0 1rem"
                >
                  <div className="widget-body">
                    <h1 className="title">{note.title}</h1>
                    <p
                      dangerouslySetInnerHTML={{ __html: note.content }}
                      className="content"
                    ></p>
                  </div>
                  <div className="widget-footer">
                    <p className="date-created">
                      {formatedDate(note.updated_at)}
                    </p>
                  </div>
                </Widget>
              ))}

            </div>
          </>
        </Container>
      </GridContainer>
    </>
  );
}

export default User;
