/* eslint-disable no-unused-vars*/
import React, { useState, useRef } from "react";
import Header from "components/Header/index";
import Button from "components/Button/index";
import { GridContainer, Container } from "./styles";
import api from "api/index";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "./styles";
import { CiEdit } from "react-icons/ci";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "styles/colorProvider";
import ReactLoading from "react-loading";

export default function CreateNote() {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const openLink = (link) => navigate(link);

  const handleCreateNote = async () => {
    setLoadingCreate(true);
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
      setLoadingCreate(false);
      openLink("/");
      toast.success("Nota criada com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    } catch (e) {
      setLoadingCreate(false);
      toast.error(e?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.getContent();
      setContent(newContent);
    }
  };

  const renderEditor = () => {
    return (
      <Editor
        apiKey="p3lvus39oh0e16fpli5qfco4oydcib1tel83iussvtdjytjr"
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleEditorChange}
        init={{
          language: "pt_BR",
          height: "100%",
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | bold italic underline strikethrough fullscreen | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save | insertfile image media template link anchor codesample | ltr rtl",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    );
  };

  return (
    <GridContainer>
      <Header />
      <Container>
        {loading ? (
          <div className="div-loading">
            <CircularProgress sx={{ color: green, margin: "3rem" }} />
          </div>
        ) : (
          <>
            <div className="div-title">
              <div className="title">
                <CiEdit style={{ width: "1.3rem", height: "1.3rem" }}/>
                <Input
                  maxLength={30}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Título"
                />
              </div>
              <Button
                disabled={!title || !content}
                onClick={handleCreateNote}
                mobile="30%"
              >
                {loadingCreate ? (
                  <ReactLoading
                    color={"#fff"}
                    height={24}
                    width={24}
                    type="spin"
                  />
                ) : (
                  "Confirmar"
                )}
              </Button>
            </div>

            <div className="div-editor">{renderEditor()}</div>
          </>
        )}
      </Container>
    </GridContainer>
  );
}
