import React from "react";
import Header from "components/Header/index";
import Button from "components/Button/index";
import { GridContainer, Container } from "./styles";
import Editor from "components/Editor/index";

export default function EditNote() {
  return (
    <GridContainer>
      <Header />
      <Container>
        <div className="div-title">
          <input placeholder="Digite o título da sua nota" className="input-title" type="text" />
          <Button>Publicar</Button>
        </div>
        <div className="div-editor">
          <Editor/>
        </div>
      </Container>
    </GridContainer>
  );
}
