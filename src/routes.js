import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from 'pages/Home/index';

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;