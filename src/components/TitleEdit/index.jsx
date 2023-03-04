import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "components/Button/index";
import { Input } from "./styles";
import { MdModeEdit } from "react-icons/md";

export default function TitleEdit({ noteData, setNoteData, handleEditNote }){
  return (
    <>
      <CssBaseline />
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" noWrap component="div">
          <MdModeEdit />
          <Input
            value={noteData?.title}
            onChange={(e) =>
              setNoteData({ ...noteData, title: e.target.value })
            }
            className="input-title"
            type="text"
            placeholder="Título"
          />
        </Typography>
        <Button
          disabled={!noteData?.title || !noteData?.content}
          onClick={handleEditNote}
        >
          Salvar
        </Button>
      </Toolbar>
    </>
  );
}
