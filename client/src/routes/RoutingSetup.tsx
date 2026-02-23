import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/admin/Login"
import Home from "../pages/Home"
import SignUp from "../pages/admin/SignUp"
import MovieDetails from "../pages/Movie-details"
import { Dashboard } from "../pages/admin/Dashboard"
import PrivateRoute from "./PrivateRoute"
import AdminLayout from "../pages/admin/AdminLayout"
import MoviePage from "../pages/admin/movie/MoviePage"
import Price from "../pages/admin/price/Price"
import Seat from "../pages/admin/seat/Seat"
import Theatre from "../pages/admin/theatre/Theatre"
import ShowPage from "../pages/admin/shows/Shows"
import ScreenPage from "../pages/admin/screen/Screen"
import BookingPage from "../pages/admin/booking/Booking"
import SeatTypePage from "../pages/admin/seatType/SeatType"

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
                    <Route path="/admin/booking" element={<BookingPage />} />
                    <Route path="/admin/price" element={<Price />} />
                    <Route path="/admin/screen" element={<ScreenPage />} />
                    <Route path="/admin/seat" element={<Seat />} />
                    <Route path="/admin/seatType" element={<SeatTypePage />} />
                    <Route path="/admin/shows" element={<ShowPage />} />
                    <Route path="/admin/theatre" element={<Theatre />} />
                </Route>

                <Route path='/' element={<Home />} />
                <Route path='/movie-details' element={<MovieDetails />} />

            </Routes>

        </BrowserRouter>
    )
}

export default RoutingSetup