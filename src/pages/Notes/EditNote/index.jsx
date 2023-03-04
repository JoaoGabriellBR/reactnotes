import React, { useEffect, useState, useRef } from "react";
import Header from "components/Header/index";
import Button from "components/Button/index";
import { GridContainer, Container } from "./styles";
import api from "api/index";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

import TitleEdit from "components/TitleEdit/index";
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

  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.getContent();
      setNoteData({ ...noteData, content: newContent});
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
    <GridContainer>
      <Header />
      <Container>
        <div>
          <TitleEdit
            noteData={noteData}
            setNoteData={setNoteData}
            handleEditNote={handleEditNote}
          />

          <div>{renderEditor()}</div>
        </div>
      </Container>
    </GridContainer>
  );
}
