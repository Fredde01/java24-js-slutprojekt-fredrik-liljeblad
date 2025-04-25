
// Importerad grundlig bild-URL för att kunna skapa fullständiga URL till bild
import { IMG_BASE_URL } from './api.js';

// Funktion för att rendera filmer
export function renderMovies(movies, container) {
    container.innerHTML = '';   
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');

        // Addera HTML-innehållet för filmen
        div.innerHTML = `
            <img src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title}">
            <div class="card-content">
                <h3>${movie.title}</h3>
                <p>📅 ${movie.release_date}</p>
                <p>⭐ ${movie.vote_average}</p>
                <p>${movie.overview}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

// Funktion för att rendera personer(Skådespelare)
export function renderPeople(people, container) {
    people.forEach(person => {
        const div = document.createElement('div');
        div.classList.add('card');

        let knownFor = '';
        person.known_for.forEach(item => {
            const prefix = item.media_type === 'tv' ? 'TV: ' : 'Movie: ';
            knownFor += `<li>${prefix}${item.title || item.name}</li>`;
        });

        // Addera HTML-innehållet för personen 
        div.innerHTML = `
            <img src="${person.profile_path ? IMG_BASE_URL + person.profile_path : 'https://via.placeholder.com/500x750?text=No+Image'}" alt="${person.name}">
            <div class="card-content">
                <h3>${person.name}</h3>
                <p>🧑‍🎤 ${person.known_for_department}</p>
                <p>⭐ ${person.popularity.toFixed(1)}</p>
                <ul>${knownFor}</ul>
            </div>
        `;

        // Lägg till diven i resultatcontainern 
        container.appendChild(div);
    });
}
