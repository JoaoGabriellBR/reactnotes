import React, { useState } from "react";
import Header from "components/Header/index";
import Button from "components/Button/index";
import { GridContainer, Container } from "./styles";
import Editor from "components/Editor/index";
import api from "api/index";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function CreateNote() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleCreateNote = async () => {
    try {
      await api({
        method: "POST",
        url: "/note",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("reactnotes_authtoken"),
        },
        data: {
          title: title,
          content: content,
        },
      });
      toast.success("Nota criada com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (e) {
      console.log(e.message);
      toast.error(e?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  };

  return (
    <GridContainer>
      <Header />
      <Container>
        <div className="div-title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da sua nota"
            className="input-title"
            type="text"
          />
          <Button disabled={!title} onClick={handleCreateNote}>
            Publicar
          </Button>
        </div>
        <div className="div-editor">
          <Editor content={content} setContent={setContent} />
        </div>
      </Container>
    </GridContainer>
  );
}
