import React from "react";
import Cookies from "js-cookie";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Home from "pages/Home/index";
import Register from "pages/Register/index";
import Login from "pages/Login/index";
import User from "pages/User/index";

//NOTES 
import CreateNote from "pages/Notes/CreateNote/index";
import EditNote from "pages/Notes/EditNote/index";

const Rotas = () => {

  const isAuthenticated = () => {
    return Cookies.get("reactnotes_authtoken");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          exact
          path="/user"
          element={
            Cookies.get("reactnotes_authtoken") ? (
              <User />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/createnote"
          element={
            Cookies.get("reactnotes_authtoken") ? (
              <CreateNote />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
         <Route
          exact
          path="/editnote/:id"
          element={
            Cookies.get("reactnotes_authtoken") ? (
              < EditNote />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
