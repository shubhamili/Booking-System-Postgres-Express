import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router"
import Login from '../pages/Login'
import Home from '../pages/Home'
const RoutingSetup = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />






            </Routes>

        </BrowserRouter>
    )
}

export default RoutingSetup