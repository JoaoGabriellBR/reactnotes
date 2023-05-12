import { React, useState, useEffect } from "react";
import Header from "components/Header/index";
import Title from "components/Title/index";
import Button from "components/Button/index";
import { Container, GridContainer, Widget } from "./styles";
import Cookies from "js-cookie";
import api from "../../api/index";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "styles/colorProvider";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function User() {
  const [userData, setUserData] = useState();
  const [noteData, setNoteData] = useState([]);
  const [noteId, setNoteId] = useState();
  const [totalCount, setTotalCount] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingDeleteNote, setLoadingDeleteNote] = useState(false);
  const [showDeleteNote, setShowDeleteNote] = useState(false);
  const [showIcons, setShowIcons] = useState(null);

  const [search, setSearch] = useState();

  const navigate = useNavigate();
  const openLink = (link) => navigate(link);

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
        search,
      },
      json: true,
    });

    setLoading(false);
    setNoteData(response.data.response);
    setTotalCount(response.data.totalCount);
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timeoutId;
    if (search === "") {
      timeoutId = setTimeout(() => {
        loadNoteData();
      }, 2000);
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line
  }, [search]);
  
  

  const renderDeleteNote = () => {
    return (
      <Dialog
        onClose={() => setShowDeleteNote(false)}
        fullWidth
        open={showDeleteNote}
      >
        <DialogTitle>Excluir Nota</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja excluir esta nota?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteNote(false)}
            style={{ scale: "90%" }}
            outlined
          >
            Cancelar
          </Button>

          <Button
            onClick={() => handleDeleteNote()}
            style={{ marginLeft: "5px", scale: "90%" }}
          >
            {loadingDeleteNote ? (
              <ReactLoading color="#fff" height={24} width={24} type="spin" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleDeleteNote = async () => {
    setLoadingDeleteNote(true);
    try {
      await api({
        method: "DELETE",
        url: `/note/${noteId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("reactnotes_authtoken"),
        },
      });
      setLoadingDeleteNote(false);
      setShowDeleteNote(false);
      setNoteData(noteData?.filter((note) => note.id !== noteId));
      setTotalCount((prevTotalCount) => prevTotalCount - 1);
      toast.success("Nota excluída com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    } catch (e) {
      setLoadingDeleteNote(false);
      toast.error(e?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {renderDeleteNote()}
      <GridContainer>
        <Header />
        <Container>
          {loading ? (
            <CircularProgress sx={{ color: green }} />
          ) : (
            <>
              <div className="div-greetings">
                <Title
                  className="title-name"
                  backgroundColor="red"
                  fontSize="25px"
                  color="#000"
                >
                  {Greetings()}, {userData?.name.split(" ")[0]}!
                </Title>

                <div className="div-search">
                  <Button
                    onClick={() => openLink("/createnote")}
                    width="8rem"
                    mobile="50%"
                  >
                    Nova nota +
                  </Button>

                  <Paper
                    component="form"
                    sx={{
                      p: "2px 15px",
                      display: "flex",
                      alignItems: "center",
                      width: 250,
                      borderRadius: "2rem",
                      marginLeft: 2
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Pesquisar notas"
                      inputProps={{ "aria-label": "search google maps" }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && loadNoteData()}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      onClick={() => loadNoteData()}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
              </div>

              <div className="div-main">
                {!noteData.length ? ( 
                  <p>Nenhuma nota encontrada</p>
                ) : (
                  noteData?.map((note) => (
                    <Widget
                      id={note.id}
                      onMouseEnter={() => setShowIcons(note.id)}
                      onMouseLeave={() => setShowIcons(null)}
                    >
                      <div className="widget-left">
                        <h1 className="title">{note.title.toUpperCase()}</h1>
                        <p className="created_at">
                          Criado em {formatedDate(note.create_at)}
                        </p>
                      </div>

                      {showIcons === note.id && (
                        <div>
                          <AiOutlineEdit
                            style={{
                              scale: "1.5",
                              cursor: "pointer",
                              marginRight: 25,
                            }}
                            onClick={() => openLink(`/editnote/${note.id}`)}
                          />
                          <AiOutlineDelete
                            onClick={() => {
                              setShowDeleteNote(true);
                              setNoteId(note.id);
                            }}
                            style={{ scale: "1.5", cursor: "pointer" }}
                          />
                        </div>
                      )}
                    </Widget>
                  ))
                )}
              </div>
              <p style={{ position: "fixed", bottom: 30 }}>
                Mostrando {noteData?.length} de {totalCount}
              </p>
            </>
          )}
        </Container>
      </GridContainer>
    </>
  );
}
