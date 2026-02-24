import axios from "axios"
import { API_ENDPOINTS } from "../../../routes/apiEndpoints"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"

export interface movie {
    id: number
    title: string
    duration: number
    genre: string
    rating: number
}


const MoviePage = () => {
    const [movies, setMovies] = useState<movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const fetchAllMovies = async () => {
        const response = await axios.get(API_ENDPOINTS.getAllMovies, { withCredentials: true });
        console.log('response.data.data', response.data.data)
        setMovies(response.data.data)
        setTotalPages(response.data.totalPages)
    }
    useEffect(() => {
        fetchAllMovies()
    }, [page])

    const navigate = useNavigate()

    return (
        <>
            <div className="flex justify-between items-center">
                <span className="m-6 font-bold text-xl">MoviePage</span>
                <Button className="cursor-pointer" onClick={() => { navigate('/admin/movie/add') }}>Add Movie</Button>
            </div>
            <div className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead> Id</TableHead>
                            <TableHead> Title</TableHead>
                            <TableHead> Duration</TableHead>
                            <TableHead> Genre</TableHead>
                            <TableHead> Rating</TableHead>
                            <TableHead className="text-right mr-6"> Actions</TableHead>
                        </TableRow>
                    </TableHeader>


                    <TableBody>
                        {movies.map((movie) => (
                            <TableRow key={movie?.id}>
                                <TableCell>{movie?.id}</TableCell>
                                <TableCell>{movie?.title}</TableCell>
                                <TableCell>{movie?.duration}</TableCell>
                                <TableCell>{movie?.genre}</TableCell>
                                <TableCell>{movie?.rating}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button size='sm' variant='outline'>Edit </Button>
                                    <Button size='sm' variant='destructive'>Delete </Button>

                                </TableCell>
                            </TableRow>
                        ))}


                    </TableBody>


                </Table>
            </div>





        </>
    )
}

export default MoviePage