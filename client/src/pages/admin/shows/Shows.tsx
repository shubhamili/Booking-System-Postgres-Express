import axios from "axios"
import { API_ENDPOINTS } from "../../../routes/apiEndpoints"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"

export interface Show {
    id: number
    formate: string
    startTime: string
    endTime: string
    screenId: number
    theatre: string
    movie: string
}

const ShowPage = () => {
    const [shows, setShows] = useState<Show[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchAllShows = async () => {
        const response = await axios.get(API_ENDPOINTS.getAllShows, {
            withCredentials: true,
            params: { page }   // 👈 important if using pagination
        })

        setShows(response.data.data)
        setTotalPages(response.data.totalPages)
    }

    useEffect(() => {
        fetchAllShows()
    }, [page])

    return (
        <>
            <div className="m-6 font-bold text-xl">Show Page</div>

            <div className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Movie</TableHead>
                            <TableHead>Format</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead>Screen</TableHead>
                            <TableHead>Theatre</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {shows.map((show) => (
                            <TableRow key={show.id}>
                                <TableCell>{show.id}</TableCell>
                                <TableCell className="capitalize">{show.movie}</TableCell>
                                <TableCell>{show.formate}</TableCell>
                                <TableCell>
                                    {new Date(show.startTime).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(show.endTime).toLocaleString()}
                                </TableCell>
                                <TableCell>{show.screenId}</TableCell>
                                <TableCell>{show.theatre}</TableCell>

                                <TableCell className="text-right space-x-2">
                                    <Button size="sm" variant="outline">Edit</Button>
                                    <Button size="sm" variant="destructive">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default ShowPage