import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import SignUp from "../pages/SignUp"

const RoutingSetup = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignUp />} />






            </Routes>

        </BrowserRouter>
    )
}

export default RoutingSetup