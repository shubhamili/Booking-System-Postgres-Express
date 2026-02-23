import axios from "axios"
import { API_ENDPOINTS } from "../../../routes/apiEndpoints"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export interface Booking {
    id: number
    userId: number
    showId: number
    totalAmount: number
    paymentId: string | null
    paymentStatus: string
    bookingStatus: string
    bookedAt: string
    expiresAt: string
    createdAt: string
    updatedAt: string
}

const BookingPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([])

    const fetchAllBookings = async () => {
        const response = await axios.get(API_ENDPOINTS.getAllBookings, {
            withCredentials: true,
        })

        setBookings(response.data.data)
    }

    useEffect(() => {
        fetchAllBookings()
    }, [])

    return (
        <>
            <div className="m-6 font-bold text-xl">Booking Page</div>

            <div className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Show</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Booking Status</TableHead>
                            <TableHead>Booked At</TableHead>
                            <TableHead>Expires At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.id}</TableCell>
                                <TableCell>{booking.userId}</TableCell>
                                <TableCell>{booking.showId}</TableCell>
                                <TableCell>₹{booking.totalAmount}</TableCell>
                                <TableCell>{booking.paymentStatus}</TableCell>
                                <TableCell>{booking.bookingStatus}</TableCell>
                                <TableCell>
                                    {new Date(booking.bookedAt).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(booking.expiresAt).toLocaleString()}
                                </TableCell>

                                <TableCell className="text-right space-x-2">
                                    <Button size="sm" variant="outline">
                                        View
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default BookingPage