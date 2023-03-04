import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { debounce } from "lodash";

export default function TinyMCE({ setContent, noteData, setNoteData }) {
  const editorRef = useRef(null);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.getContent();
      setContent(newContent);
    }
  };

  return (
    <>
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
    </>
  );
}
