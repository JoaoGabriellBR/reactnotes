import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Input } from "./styles";
import Header from "components/Header/index";
import Button from "components/Button/index";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import api from "api/index";
import { Editor } from "@tinymce/tinymce-react";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "styles/colorProvider";
import ReactLoading from "react-loading";

export default function EditNote() {
  const { id } = useParams();
  const editorRef = useRef(null);

  const [noteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const loadNoteData = async () => {
    setLoading(true);
    const response = await api({
      method: "GET",
      url: `/note/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("reactnotes_authtoken"),
      },
      json: true,
    });

    setNoteData(response.data);
    setLoading(false);
    console.log(noteData);
  };

  useEffect(() => {
    loadNoteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateNote = async () => {
    setLoadingUpdate(true);
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
      setLoadingUpdate(false);
      toast.success("Nota atualizada com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    } catch (e) {
      setLoadingUpdate(false);
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
      setNoteData({ ...noteData, content: newContent });
    }
  };

  const renderEditor = () => {
    return (
      <Editor
        apiKey="p3lvus39oh0e16fpli5qfco4oydcib1tel83iussvtdjytjr"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={noteData?.content}
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
    <>
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
                  value={noteData?.title}
                  onChange={(e) =>
                    setNoteData({ ...noteData, title: e.target.value })
                  }
                  type="text"
                  placeholder="Título"
                />
              </div>

              <div className="div-buttons">
                <Button
                  disabled={!noteData?.title || !noteData?.content}
                  onClick={handleUpdateNote}
                  style={{ marginRight: "15px" }}
                >
                {loadingUpdate ? (
                  <ReactLoading
                    color={"#fff"}
                    height={24}
                    width={24}
                    type="spin"
                  />
                ) : (
                  "Atualizar"
                )}
                </Button>
              </div>
            </div>

            <div className="div-editor">{renderEditor()}</div>
          </>
        )}
      </Container>
    </>
  );
}
