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

export interface SeatType {
    id: number
    name: string
}

const SeatTypePage = () => {
    const [seatTypes, setSeatTypes] = useState<SeatType[]>([])

    const fetchSeatTypes = async () => {
        const response = await axios.get(API_ENDPOINTS.getAllSeatTypes, {
            withCredentials: true,
        })

        setSeatTypes(response.data.data)
    }

    useEffect(() => {
        fetchSeatTypes()
    }, [])

    return (
        <>
            <div className="m-6 font-bold text-xl">Seat Type Page</div>

            <div className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Seat Type Name</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {seatTypes.map((seat) => (
                            <TableRow key={seat.id}>
                                <TableCell>{seat.id}</TableCell>
                                <TableCell className="font-medium">
                                    {seat.name}
                                </TableCell>

                                <TableCell className="text-right space-x-2">
                                    <Button size="sm" variant="outline">
                                        Edit
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                        Delete
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

export default SeatTypePage