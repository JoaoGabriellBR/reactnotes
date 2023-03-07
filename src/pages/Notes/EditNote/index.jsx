import React, { useEffect, useState, useRef } from "react";
import { Container, Input } from "./styles";
import Header from "components/Header/index";
import Button from "components/Button/index";
import { useParams } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import api from "api/index";

import { Editor } from "@tinymce/tinymce-react";

export default function EditNote() {
  const { id } = useParams();
  const editorRef = useRef(null);

  const [noteData, setNoteData] = useState([]);

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

    setNoteData(response.data);
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
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000
      });
    } catch (e) {
      console.log(e.message);
      toast.error(e?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 2000
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
        initialValue={noteData?.content}
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

  return (
    <>
      <Header />
      <Container>
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
            onClick={handleEditNote}
            style={{ marginRight: "15px"}}
            outlined
          >
            Excluir
          </Button>

          <Button
            disabled={!noteData?.title || !noteData?.content}
            onClick={handleEditNote}
            style={{ marginRight: "15px"}}
          >
            Atualizar
          </Button>
          </div>
        </div>

        <div className="div-editor">{renderEditor()}</div>
      </Container>
    </>
  );
}
