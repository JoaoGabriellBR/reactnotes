import React, { useEffect, useState, useRef } from "react";
import { Container, Input } from "./styles";
import Header from "components/Header/index";
import Button from "components/Button/index";
import { useParams, useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import api from "api/index";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { Editor } from "@tinymce/tinymce-react";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "styles/colorProvider";
import ReactLoading from "react-loading";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [noteData, setNoteData] = useState([]);
  const [showDeleteNote, setShowDeleteNote] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const openLink = (link) => navigate(link);

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

  const handleDeleteNote = async () => {
    try {
      await api({
        method: "DELETE",
        url: `/note/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("reactnotes_authtoken"),
        },
      });
      openLink("/");
      toast.success("Nota excluída com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000,
      });
    } catch (e) {
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
          height: 500,
          menubar: "file edit view insert format tools table help",
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
            "undo redo | bold italic underline strikethrough fullscreen | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    );
  };

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
            disabled={!noteData?.title || !noteData?.content}
            onClick={() => setShowDeleteNote(false)}
            style={{ scale: "90%" }}
            outlined
          >
            Cancelar
          </Button>

          <Button
            onClick={handleDeleteNote}
            style={{ marginLeft: "5px", scale: "90%" }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      {renderDeleteNote()}
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
                <MdModeEdit />
                <Input
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
                  onClick={() => setShowDeleteNote(true)}
                  style={{ marginRight: "15px" }}
                  outlined
                >
                  Excluir
                </Button>

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
