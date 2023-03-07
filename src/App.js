import React from "react";
import { GlobalStyle } from "styles/globalStyle";
import Rotas from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <Rotas/>
    </>
  );
}

export default App;
