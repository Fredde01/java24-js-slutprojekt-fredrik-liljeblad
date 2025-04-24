
// Importerade funktioner från andra moduler
import { getTopRatedMovies, getPopularMovies } from './api.js';
import { renderMovies, renderPeople } from './render.js';
import { handleSearch } from './search.js';
import { sortMoviesOrPeople } from './sort.js';

// Hämtar DOM-element för interface
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const sortSelect = document.getElementById('sortSelect');

// Variabler för att hålla reda på nuvarande resultat och sökningar
let currentMovies = [];
let currentPeople = [];
let currentSearchResults = [];

// Funktion för att hantera användares klick på "Top rated" knappen
document.getElementById('topRatedBtn').addEventListener('click', async () => {
    currentSearchResults = [];
    currentMovies = await getTopRatedMovies(); 
    renderMovies(currentMovies, resultsContainer); 
});

// Funktion för att hantera användares klick på "Popular" knappen
document.getElementById('popularBtn').addEventListener('click', async () => {
    currentSearchResults = [];
    currentMovies = await getPopularMovies(); 
    renderMovies(currentMovies, resultsContainer); 
});

// Funktion för att hantera formulärets submit(sökning)
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        
        currentSearchResults = await handleSearch(query, resultsContainer);
        
        
        currentMovies = currentSearchResults.filter(item => item.media_type === 'movie');
        currentPeople = currentSearchResults.filter(item => item.media_type === 'person');
        
        
        if (currentMovies.length > 0) renderMovies(currentMovies, resultsContainer);
        if (currentPeople.length > 0) renderPeople(currentPeople, resultsContainer);
    }
});

// Hanterar ändring av sorterings-alternativen i dropdown-menyn
sortSelect.addEventListener('change', () => {
    const sortCriteria = sortSelect.value; 
    let sortedResults = [];

    if (currentSearchResults.length > 0) {
        
        const movies = currentSearchResults.filter(item => item.media_type === 'movie');
        const people = currentSearchResults.filter(item => item.media_type === 'person');

        if (movies.length) {
            sortedResults = sortMoviesOrPeople(movies, sortCriteria); 
            renderMovies(sortedResults, resultsContainer);
        }

        if (people.length) {
            sortedResults = sortMoviesOrPeople(people, sortCriteria); 
            renderPeople(sortedResults, resultsContainer);
        }
    } else if (currentMovies.length > 0) {
        
        sortedResults = sortMoviesOrPeople(currentMovies, sortCriteria);
        renderMovies(sortedResults, resultsContainer);
    }
});
