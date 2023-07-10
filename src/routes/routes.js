import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthenticatedRoute from "./authenticatedRoute";

// USER
import Register from "pages/Register/index";
import Login from "pages/Login/index";
import User from "pages/User/index";
import Profile from "pages/Profile/index";

//NOTES
import CreateNote from "pages/Notes/CreateNote/index";
import EditNote from "pages/Notes/EditNote/index";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={<AuthenticatedRoute component={User} />}
        ></Route>
        <Route
          exact
          path="/createnote"
          element={<AuthenticatedRoute component={CreateNote} />}
        ></Route>
        <Route
          exact
          path="/editnote/:id"
          element={<AuthenticatedRoute component={EditNote} />}
        ></Route>
        <Route
          exact
          path="/profile"
          element={<AuthenticatedRoute component={Profile} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
