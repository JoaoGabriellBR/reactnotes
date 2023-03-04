import React, { useState, useRef } from "react";
import Header from "components/Header/index";
import Button from "components/Button/index";
import { GridContainer, Container } from "./styles";
import TinyMCE from "components/TinyMCE/index";
import api from "api/index";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import TitleCreate from "components/TitleCreate/index";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateNote() {
  const editorRef = useRef(null);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const navigate = useNavigate();

  const openLink = (link) => {
    navigate(link);
  };

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
      openLink("/");
      toast.success("Nota criada com sucesso!", {
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
          <TitleCreate
            handleCreateNote={handleCreateNote}
            title={title}
            setTitle={setTitle}
            content={content}
          />

          <div>{renderEditor()}</div>
        </div>
      </Container>
    </GridContainer>
  );
}
