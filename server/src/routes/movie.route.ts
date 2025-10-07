import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import { addMovie, deleteMovie, editMovie, getAllMovies, getMovieById } from "../controllers/movie.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const movieRoute: Router = Router();

movieRoute.post('/add', verifyToken,upload.single("poster"), addMovie);
movieRoute.get('/get', verifyToken, getAllMovies);
movieRoute.get('/getById', verifyToken, getMovieById);
movieRoute.delete('/delete', verifyToken, deleteMovie);
movieRoute.put('/edit', verifyToken, editMovie);

export default movieRoute;