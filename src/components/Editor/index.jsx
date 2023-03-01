import React, { useRef } from "react";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";

export default function Editor({ content, setContent }) {
  const editorRef = useRef(null);

  const handleEditorChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  return (
    <>
      <TinyMCE
        apiKey="your-api-key"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Conteúdo da sua nota.</p>"
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
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
}
