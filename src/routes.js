import React from "react";
import Cookies from "js-cookie";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

// USER
import Register from "pages/Register/index";
import Login from "pages/Login/index";
import User from "pages/User/index";
import Profile from "pages/Profile/index";

//NOTES
import CreateNote from "pages/Notes/CreateNote/index";
import EditNote from "pages/Notes/EditNote/index";

export default function Rotas() {
  const isAuthenticated = () => {
    return Cookies.get("reactnotes_authtoken");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={isAuthenticated() ? <User /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/createnote"
          element={
            isAuthenticated() ? <CreateNote /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          exact
          path="/editnote/:id"
          element={isAuthenticated() ? <EditNote /> : <Navigate to="/login" />}
        ></Route>
        <Route
          exact
          path="/profile"
          element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
