import React, { useEffect, useState } from "react";
import Header from "components/Header/index";
import Button from "components/Button/index";
import SideMenu from "components/SideMenu/index";
import { GridContainer, Container } from "./styles";
import Editor from "components/Editor/index";
import api from "api/index";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
  const { id } = useParams();

  const [noteData, setNoteData] = useState();

  const loadNoteData = async () => {
    const response = await api({
      method: "GET",
      url: `/note/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("reactnotes_authtoken"),
      },
      json: true,
    });

    setNoteData(response.data.response);
    console.log(noteData);
  };

  useEffect(() => {
    loadNoteData();
  }, []);

  const handleEditNote = async () => {
    try {
      await api({
        method: "PATCH",
        url: `/note/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("reactnotes_authtoken"),
        },
        data: {
          title: noteData?.title,
          content: noteData?.content,
        },
      });
      toast.success("Nota atualizada com sucesso!", {
        position: "top-right",
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
        <div>
          {/* <SideMenu
            handleCreateNote={handleCreateNote}
            open={open}
            setOpen={setOpen}
            title={title}
            setTitle={setTitle}
            content={content}
          /> */}

          <div>
            <Editor
            // content={content}
            // setContent={setContent}
            // handleCreateNote={handleCreateNote}
            />
          </div>
        </div>
      </Container>
    </GridContainer>
  );
}
