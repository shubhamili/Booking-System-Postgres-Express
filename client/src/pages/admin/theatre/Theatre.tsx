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

export interface Theatre {
    id: number
    name: string
    location: string
    createdAt: string
}

const TheatrePage = () => {
    const [theatres, setTheatres] = useState<Theatre[]>([])

    const fetchAllTheatres = async () => {
        const response = await axios.get(API_ENDPOINTS.getAllTheatres, {
            withCredentials: true,
        })

        setTheatres(response.data.data)
    }

    useEffect(() => {
        fetchAllTheatres()
    }, [])

    return (
        <>
            <div className="m-6 font-bold text-xl">Theatre Page</div>

            <div className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {theatres.map((theatre) => (
                            <TableRow key={theatre.id}>
                                <TableCell>{theatre.id}</TableCell>
                                <TableCell className="capitalize">
                                    {theatre.name}
                                </TableCell>
                                <TableCell>{theatre.location}</TableCell>
                                <TableCell>
                                    {new Date(theatre.createdAt).toLocaleString()}
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

export default TheatrePage