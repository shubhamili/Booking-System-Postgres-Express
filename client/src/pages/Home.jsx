import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
const Home = () => {
    const navigator = useNavigate();
    const [movies, setMovies] = useState([]);
    const fetchAllMovies = async () => {
        const response = await axios.get('http://localhost:3000/api/movie/get', { withCredentials: true })
        setMovies(response.data.data)
    }


    useEffect(() => {
        fetchAllMovies()
    }, [])


    return (
        <div className="bg-gray-100 min-h-screen p-6">

            {
                movies.length > 0 ?
                    (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {movies.map((m) => (
                            <div
                                key={m.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                            >
                                {/* Poster */}
                                <img
                                    src={`http://localhost:3000/uploads/${m.poster}`}
                                    alt={m.title}
                                    className="h-52 w-full object-cover"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr6Mm8Bd2m-dIOswHCfB2gCWAOZcKIFzAZGg&s";
                                    }}
                                />


                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                                        {m.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                        {m.description}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                                        <span>⭐ {m.rating}</span>
                                        <span className="capitalize">{m.language}</span>
                                        <span className="capitalize">{m.type}</span>
                                    </div>

                                    {/* Button */}
                                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                                        View Shows
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>)
                    : (
                        <>
                            <div>go to login</div>
                            <br />
                            <button className='border p-2 w-90 cursor-pointer' onClick={() => { navigator('/login') }}>click</button>
                        </>
                    )

            }
        </div>
    )
}

export default Home