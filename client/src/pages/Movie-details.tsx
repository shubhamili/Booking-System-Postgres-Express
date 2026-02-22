


import { useLocation } from "react-router-dom";

const MovieDetails = () => {
    const location = useLocation();
    const { movie } = location.state || {};

    if (!movie) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-5xl mb-4">🎬</p>
                    <p className="text-neutral-500 text-base">No movie data found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* ── HERO ── */}
                <div className="flex gap-8 mb-10">
                    <img
                        src={`http://localhost:3000/uploads/${movie.poster}`}
                        alt={movie.title}
                        className="w-48 h-72 object-cover rounded-lg flex-shrink-0 border border-neutral-800"
                    />

                    <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                        <div>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {[movie.genre, movie.language, movie.type].filter(Boolean).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs font-medium uppercase tracking-widest text-neutral-400 bg-neutral-800 border border-neutral-700 px-2.5 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-bold leading-tight mb-3 text-white">
                                {movie.title}
                            </h1>

                            {/* Description */}
                            <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                {movie.description}
                            </p>

                            {/* Meta */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="text-neutral-300">{movie.rating}</span>
                                </span>
                                <span>{movie.duration} hrs</span>
                                <span>{new Date(movie.releaseDate).toDateString()}</span>
                                <span>{movie.currency?.toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Trailer */}
                        {movie.trailerUrl && (
                            <a
                                href={movie.trailerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-500 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors w-fit"
                            >
                                Watch Trailer
                            </a>
                        )}
                        {movie && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" inline-flex items-center gap-2 text-sm font-semibold text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors w-fit"
                            >
                                Book Tickets
                            </a>
                        )}
                    </div>
                </div>

                {/* ── CAST ── */}
                {movie.cast && movie.cast.length > 0 && (
                    <section className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-3 pb-2 border-b border-neutral-800">
                            Cast
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {movie.cast.map((actor: any, i: number) => (
                                <span
                                    key={i}
                                    className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm px-3 py-1.5 rounded-full"
                                >
                                    {actor.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── CREW ── */}
                {movie.crew && movie.crew.length > 0 && (
                    <section className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-3 pb-2 border-b border-neutral-800">
                            Crew
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {movie.crew.map((member: any, i: number) => (
                                <span
                                    key={i}
                                    className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm px-3 py-1.5 rounded-full"
                                >
                                    {member.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}



            </div>
        </div>
    );
};

export default MovieDetails;