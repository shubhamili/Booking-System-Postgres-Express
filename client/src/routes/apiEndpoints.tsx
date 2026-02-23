const Backend = import.meta.env.VITE_BACKEND_URL

export const API_ENDPOINTS = {
    'login': `${Backend}/auth/signin`,
    'signIn': `${Backend}/auth/create`,
    'getAllMovies': `${Backend}/movie/get`,
    'getShowsByMovieId': `${Backend}/show/display`,
    'getAllShows': `${Backend}/show/getAll`,
    'getAllScreens': `${Backend}/screen/getAll`,
    'getAllBookings': `${Backend}/book/getAll`,
    'getAllTheatres': `${Backend}/theatre/getAll`,
    'getAllSeatTypes': `${Backend}/seatType/getAll`,
    'me': `${Backend}/auth/me`
}

