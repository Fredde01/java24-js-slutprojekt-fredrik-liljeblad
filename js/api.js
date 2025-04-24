
// Api koppling till TMDB för att hämta information (filmer, bilder osv)
const API_KEY = 'bdbddf85e23bf6c1a29253eacab72323';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Funktion för att hämta 10 högst rankade filmer
export async function getTopRatedMovies() {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    return (await res.json()).results.slice(0, 10);
}

// Funktion för att hämta 10 mest populära filmer
export async function getPopularMovies() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return (await res.json()).results.slice(0, 10);
}

// Funktion för att hämta information baserat på användar input
export async function search(query) {
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`);
    return (await res.json()).results;
}
