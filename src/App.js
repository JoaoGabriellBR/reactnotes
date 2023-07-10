import React from "react";
import { GlobalStyle } from "styles/globalStyle";
import Rotas from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <Rotas />
    </>
  );
}
