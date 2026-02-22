import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/admin/Login"
import Home from "../pages/Home"
import SignUp from "../pages/admin/SignUp"
import MovieDetails from "../pages/Movie-details"
import { Dashboard } from "../pages/admin/Dashboard"
import PrivateRoute from "./PrivateRoute"

const RoutingSetup = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin/login' element={<Login />} />
                <Route path='/admin/signup' element={<SignUp />} />
                <Route path='/admin/dashboard'
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route path='/' element={<Home />} />
                <Route path='/movie-details' element={<MovieDetails />} />

            </Routes>

        </BrowserRouter>
    )
}

export default RoutingSetup