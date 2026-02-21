import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Movie {
    id: number;
    title: string;
    rating: number;
    language: string;
    genre: string;
    poster: string;
    votes: string;
    isNew?: boolean;
    releaseDate?: string;
}

interface Offer {
    id: number;
    title: string;
    description: string;
    code: string;
    color: string;
    image: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NOW_SHOWING: Movie[] = [
    {
        id: 1,
        title: "Dune: Part Two",
        rating: 8.9,
        language: "English",
        genre: "Sci-Fi / Adventure",
        poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&q=80",
        votes: "248K",
    },
    {
        id: 2,
        title: "Oppenheimer",
        rating: 8.7,
        language: "English",
        genre: "Biography / Drama",
        poster: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80",
        votes: "312K",
    },
    {
        id: 3,
        title: "Inception Redux",
        rating: 9.1,
        language: "English",
        genre: "Thriller / Sci-Fi",
        poster: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&q=80",
        votes: "189K",
    },
    {
        id: 4,
        title: "Blade Runner 2099",
        rating: 8.4,
        language: "English",
        genre: "Sci-Fi / Noir",
        poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
        votes: "95K",
    },
    {
        id: 5,
        title: "Kalki 2898-AD",
        rating: 8.2,
        language: "Hindi / Telugu",
        genre: "Action / Mythology",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
        votes: "421K",
        isNew: true,
    },
    {
        id: 6,
        title: "The Grand Budapest",
        rating: 8.6,
        language: "English",
        genre: "Comedy / Drama",
        poster: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
        votes: "73K",
    },
    {
        id: 7,
        title: "Interstellar II",
        rating: 9.3,
        language: "English",
        genre: "Sci-Fi / Drama",
        poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
        votes: "567K",
        isNew: true,
    },
    {
        id: 8,
        title: "The Dark Knight Falls",
        rating: 8.8,
        language: "English",
        genre: "Action / Superhero",
        poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80",
        votes: "634K",
    },
];

const COMING_SOON: Movie[] = [
    {
        id: 9,
        title: "Avatar: Fire & Ash",
        rating: 0,
        language: "English",
        genre: "Sci-Fi / Adventure",
        poster: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&q=80",
        votes: "",
        releaseDate: "Mar 28, 2025",
    },
    {
        id: 10,
        title: "Mission: Impossible 9",
        rating: 0,
        language: "English",
        genre: "Action / Thriller",
        poster: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=400&q=80",
        votes: "",
        releaseDate: "Apr 12, 2025",
    },
    {
        id: 11,
        title: "Pushpa 3",
        rating: 0,
        language: "Telugu / Hindi",
        genre: "Action / Drama",
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
        votes: "",
        releaseDate: "May 1, 2025",
    },
    {
        id: 12,
        title: "Thunderbolts",
        rating: 0,
        language: "English",
        genre: "Action / Superhero",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80",
        votes: "",
        releaseDate: "May 16, 2025",
    },
    {
        id: 13,
        title: "The Fantastic Four",
        rating: 0,
        language: "English",
        genre: "Superhero / Sci-Fi",
        poster: "https://images.unsplash.com/photo-1608889175638-9322300c46e8?w=400&q=80",
        votes: "",
        releaseDate: "Jul 25, 2025",
    },
];

const OFFERS: Offer[] = [
    {
        id: 1,
        title: "HDFC Bank Offer",
        description: "Get 20% off up to ₹150 on 2+ tickets with HDFC Credit Cards",
        code: "HDFC20",
        color: "from-blue-900 to-blue-700",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    },
    {
        id: 2,
        title: "Weekend Special",
        description: "Buy 3 tickets and get 1 free every Saturday & Sunday",
        code: "WKND3+1",
        color: "from-rose-900 to-rose-700",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    },
    {
        id: 3,
        title: "Student Discount",
        description: "Flat ₹100 off on any show with valid student ID",
        code: "STUDENT100",
        color: "from-emerald-900 to-emerald-700",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
    },
];

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"];

const HERO_MOVIE = {
    title: "Interstellar II",
    tagline: "Beyond the stars, beyond time itself.",
    bg: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=85",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarIcon = () => (
    <svg className="w-3.5 h-3.5 text-yellow-400 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const Navbar = ({
    city,
    setCity,
    search,
    setSearch,
}: {
    city: string;
    setCity: (c: string) => void;
    search: string;
    setSearch: (s: string) => void;
}) => {
    const [cityOpen, setCityOpen] = useState(false);
    const navigate = useNavigate()
    return (
        <nav className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-white/5 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                            <span className="text-white font-black text-sm">🎬</span>
                        </div>
                        <span className="text-white font-black text-xl tracking-tight">
                            TICKET<span className="text-rose-500">LIL</span>
                        </span>
                    </div>

                    {/* Search */}
                    <div className="flex-1 max-w-xl mx-auto hidden sm:block">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search movies, events, plays..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 focus:bg-white/8 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3 ml-auto sm:ml-0">
                        {/* City Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setCityOpen(!cityOpen)}
                                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                            >
                                <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="hidden sm:block">{city}</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {cityOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                                    {CITIES.map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => { setCity(c); setCityOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${c === city ? "text-rose-400 bg-rose-500/10" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sign In */}
                        <button
                            onClick={() => {
                                navigate('/login')
                            }}
                            className="bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-rose-500/25 active:scale-95">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile search */}
            <div className="sm:hidden px-4 pb-3">
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search movies..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 transition-all"
                    />
                </div>
            </div>
        </nav>
    );
};

const HeroSection = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <section
            className="relative w-full h-[480px] sm:h-[560px] overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={HERO_MOVIE.bg}
                alt={HERO_MOVIE.title}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hovered ? "scale-105" : "scale-100"}`}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-lg">
                        <span className="inline-block bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
                            🔥 Now Showing
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black text-white mb-3 leading-none tracking-tight">
                            {HERO_MOVIE.title}
                        </h1>
                        <p className="text-white/60 text-base sm:text-lg mb-6 font-light">{HERO_MOVIE.tagline}</p>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 text-sm font-bold px-3 py-1.5 rounded-lg border border-yellow-500/20">
                                <StarIcon /> 9.3 / 10
                            </div>
                            <span className="text-white/40 text-sm">567K Votes</span>
                            <span className="text-white/30">•</span>
                            <span className="text-white/50 text-sm">English</span>
                            <span className="text-white/30">•</span>
                            <span className="text-white/50 text-sm">Sci-Fi</span>
                        </div>

                        <div className="flex gap-3">
                            <button className="group bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-3.5 rounded-xl text-base transition-all duration-200 hover:shadow-2xl hover:shadow-rose-500/30 active:scale-95 flex items-center gap-2">
                                Book Now
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl text-base transition-all duration-200 backdrop-blur-sm border border-white/10 active:scale-95">
                                ▶ Trailer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 right-8 hidden sm:flex flex-col items-center gap-1 text-white/30">
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
            </div>
        </section>
    );
};

const MovieCard = ({ movie, showRelease = false }: { movie: Movie; showRelease?: boolean }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="group relative bg-[#161616] rounded-2xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-1 cursor-pointer">
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden bg-[#1a1a1a]">
                <img
                    src={imgError ? `https://placehold.co/400x600/1a1a1a/444?text=${encodeURIComponent(movie.title)}` : movie.poster}
                    alt={movie.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* New badge */}
                {movie.isNew && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">NEW</span>
                )}

                {/* Rating badge */}
                {movie.rating > 0 && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 border border-yellow-500/20">
                        <StarIcon />
                        {movie.rating}
                    </div>
                )}

                {/* Hover book button */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold py-2.5 rounded-xl transition-colors">
                        {showRelease ? "Notify Me" : "Book Tickets"}
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-white font-bold text-sm leading-tight mb-1 truncate group-hover:text-rose-400 transition-colors">
                    {movie.title}
                </h3>
                <p className="text-white/40 text-xs mb-1">{movie.genre}</p>
                <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs">{movie.language}</span>
                    {showRelease ? (
                        <span className="text-rose-400 text-xs font-semibold">{movie.releaseDate}</span>
                    ) : (
                        movie.votes && <span className="text-white/30 text-xs">{movie.votes} votes</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="flex items-end justify-between mb-6">
        <div>
            <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tight">{title}</h2>
            {subtitle && <p className="text-white/40 text-sm mt-1">{subtitle}</p>}
        </div>
        <button className="text-rose-400 hover:text-rose-300 text-sm font-semibold transition-colors flex items-center gap-1">
            See all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
);

const NowShowingSection = ({ search }: { search: string }) => {
    const filtered = NOW_SHOWING.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.genre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <SectionHeader title="Now Showing" subtitle={`${filtered.length} movies in your city`} />
            {filtered.length === 0 ? (
                <div className="text-center py-20 text-white/30">
                    <div className="text-5xl mb-4">🎬</div>
                    <p className="text-lg">No movies found for "{search}"</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {filtered.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </section>
    );
};

const ComingSoonSection = () => (
    <section className="py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Coming Soon" subtitle="Mark your calendars" />
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
                {COMING_SOON.map((movie) => (
                    <div key={movie.id} className="flex-shrink-0 w-44 sm:w-52">
                        <MovieCard movie={movie} showRelease />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const OffersSection = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader title="Offers & Deals" subtitle="Save more on every booking" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERS.map((offer) => (
                <div
                    key={offer.id}
                    className={`relative bg-gradient-to-br ${offer.color} rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer group`}
                >
                    <img
                        src={offer.image}
                        alt={offer.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-15 transition-opacity"
                    />
                    <div className="relative p-6">
                        <h3 className="text-white font-black text-lg mb-2">{offer.title}</h3>
                        <p className="text-white/70 text-sm mb-5 leading-relaxed">{offer.description}</p>
                        <div className="flex items-center justify-between">
                            <div className="bg-black/30 border border-white/20 rounded-lg px-3 py-1.5">
                                <span className="text-white font-mono font-bold text-sm tracking-widest">{offer.code}</span>
                            </div>
                            <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors active:scale-95">
                                Copy Code
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const QuickFilters = () => {
    const filters = ["All", "Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Thriller", "Romance"];
    const [active, setActive] = useState("All");

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActive(f)}
                        className={`flex-shrink-0 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 ${active === f
                            ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30"
                            : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="bg-[#050505] border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
                <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                            <span className="text-white text-sm">🎬</span>
                        </div>
                        <span className="text-white font-black text-xl">
                            cine<span className="text-rose-500">flux</span>
                        </span>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">
                        India's fastest growing movie ticket booking platform with the best offers and seamless experience.
                    </p>
                    <div className="flex gap-3 mt-5">
                        {["𝕏", "f", "in", "▶"].map((icon, i) => (
                            <button
                                key={i}
                                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-white/50 hover:text-white text-sm transition-all duration-200"
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                {[
                    {
                        title: "Movies",
                        links: ["Now Showing", "Coming Soon", "Premieres", "Top Rated", "New Releases"],
                    },
                    {
                        title: "Help",
                        links: ["About Us", "Contact Support", "Refund Policy", "FAQ", "Gift Cards"],
                    },
                    {
                        title: "Cities",
                        links: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"],
                    },
                ].map((col) => (
                    <div key={col.title}>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">{col.title}</h4>
                        <ul className="space-y-2.5">
                            {col.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-white/40 hover:text-rose-400 text-sm transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* App download strip */}
            <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-white/40 text-sm">Download the app:</span>
                    <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        🍎 App Store
                    </button>
                    <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        ▶ Play Store
                    </button>
                </div>
                <p className="text-white/25 text-xs">© 2025 CineFlux. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const FloatingPlayer = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:block">
        <div className="bg-[#161616] border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-5 shadow-2xl backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white text-xs">🎬</div>
            <div>
                <p className="text-white text-xs font-semibold">Interstellar II - Trailer</p>
                <p className="text-white/40 text-xs">Now Playing</p>
            </div>
            <div className="flex items-center gap-2">
                <button className="text-white/50 hover:text-white transition-colors text-lg">⏮</button>
                <button className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white text-xs transition-colors">▶</button>
                <button className="text-white/50 hover:text-white transition-colors text-lg">⏭</button>
            </div>
            <button className="text-white/30 hover:text-white transition-colors">✕</button>
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
    const [city, setCity] = useState("Mumbai");
    const [search, setSearch] = useState("");

    return (
        <div className="min-h-screen bg-[#0d0d0d] font-sans antialiased">
            <Navbar city={city} setCity={setCity} search={search} setSearch={setSearch} />
            <HeroSection />
            <QuickFilters />
            <NowShowingSection search={search} />
            <ComingSoonSection />
            <OffersSection />
            <Footer />
            <FloatingPlayer />
        </div>
    );
}