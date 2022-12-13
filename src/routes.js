import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from 'pages/Home/index';
import Register from 'pages/Register/index';
import Login from 'pages/Login/index';
import User from 'pages/User/index';

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>

                <Route path='/user' element={<User />}></Route> {/*ROTA PRIVADA */}
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;