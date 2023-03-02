import React, { useState } from "react";
import Header from "components/Header/index";
import Button from "components/Button/index";
import SideMenu from "components/SideMenu/index";
import { GridContainer, Container } from "./styles";
import Editor from "components/Editor/index";
import api from "api/index";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function CreateNote() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [open, setOpen] = useState(false);

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
        <div style={{width: open ? "82.5%" : "100%" }}>
          <SideMenu open={open} setOpen={setOpen} title={title} setTitle={setTitle}/>
          <div>
            <Editor content={content} setContent={setContent} handleCreateNote={handleCreateNote} />
          </div>
        </div>
      </Container>
    </GridContainer>
  );
}
