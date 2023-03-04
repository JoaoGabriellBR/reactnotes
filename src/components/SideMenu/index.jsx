import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "components/Button/index";
import { Input } from "./styles";
import { MdModeEdit } from "react-icons/md";

export default function SideMenu({
  handleCreateNote,
  open,
  setOpen,
  title,
  setTitle,
  content,
}) {
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
        open={open}
      >
        <Typography variant="h6" noWrap component="div">
          <MdModeEdit/>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-title"
            type="text"
            placeholder="Título"
          />
        </Typography>
        <Button disabled={!title || !content} onClick={handleCreateNote}>
          Salvar
        </Button>
      </Toolbar>
    </>
  );
}
