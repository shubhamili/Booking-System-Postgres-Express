import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/admin/Login"
import Home from "../pages/Home"
import SignUp from "../pages/admin/SignUp"
import MovieDetails from "../pages/Movie-details"
import { Dashboard } from "../pages/admin/Dashboard"
import PrivateRoute from "./PrivateRoute"
import AdminLayout from "../pages/admin/AdminLayout"
import MoviePage from "../pages/admin/movie/MoviePage"
import Booking from "../pages/admin/booking/Booking"
import Price from "../pages/admin/price/Price"
import Screen from "../pages/admin/screen/Screen"
import Seat from "../pages/admin/seat/Seat"
import SeatType from "../pages/admin/seatType/SeatType"
import { Shows } from "../pages/admin/shows/Shows"
import Theatre from "../pages/theatre/Theatre"

const RoutingSetup = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin/login' element={<Login />} />
                <Route path='/admin/signup' element={<SignUp />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path='/admin/dashboard'
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/admin/movie" element={<MoviePage />} />
                    <Route path="/admin/booking" element={<Booking />} />
                    <Route path="/admin/price" element={<Price />} />
                    <Route path="/admin/screen" element={<Screen />} />
                    <Route path="/admin/seat" element={<Seat />} />
                    <Route path="/admin/seatType" element={<SeatType />} />
                    <Route path="/admin/shows" element={<Shows />} />
                    <Route path="/admin/theatre" element={<Theatre />} />
                </Route>

                <Route path='/' element={<Home />} />
                <Route path='/movie-details' element={<MovieDetails />} />

            </Routes>

        </BrowserRouter>
    )
}

export default RoutingSetup