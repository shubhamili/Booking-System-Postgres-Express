const Backend = import.meta.env.VITE_BACKEND_URL

export const API_ENDPOINTS = {
    'login': `${Backend}/auth/signin`,
    'signIn': `${Backend}/auth/create`,

    'getAllMovies': `${Backend}/movie/get`,

    'getShowsByMovieId': `${Backend}/show/display`,


    'me': `${Backend}/auth/me`
}

