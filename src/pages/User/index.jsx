import { React, useState, useEffect } from "react";
import Header from "components/Header/index";
import Title from "components/Title/index";
import { Container, GridContainer, Widget } from "./styles";
import Cookies from "js-cookie";
import api from "../../api/index";
import { useNavigate } from "react-router-dom";
import createNote from "../../assets/createnote.png";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "styles/colorProvider";

function User() {
  const [userData, setUserData] = useState();
  const [noteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(false);

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
  };

  const formatedDate = (date) => {
    return moment(date).format("DD/MM/YYYY HH:mm");
  };

  const loadNoteData = async () => {
    setLoading(true);
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
    setLoading(false);
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

  useEffect(() => {
    loadNoteData();
  }, []);

  return (
    <>
      <GridContainer>
        <Header />
        <Container>
          {loading ? (
            <CircularProgress sx={{ color: green }} />
          ) : (
            <>
              <Title
                className="title-name"
                backgroundColor="red"
                fontSize="25px"
                color="#000"
              >
                {Greetings()}, {userData?.name.split(" ")[0]}!
              </Title>

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
                  <Widget onClick={() => openLink(`/editnote/${note.id}`)}>
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
          )}
        </Container>
      </GridContainer>
    </>
  );
}

export default User;
