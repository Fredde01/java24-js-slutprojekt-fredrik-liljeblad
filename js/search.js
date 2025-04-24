import { search } from './api.js';
import { renderMovies, renderPeople } from './render.js';

export async function handleSearch(query, container,) {
    try {
        const results = await search(query);
        if (results.length === 0) {
            container.innerHTML = '<p>No results found. Check your spelling or try again.</p>';
            return [];
        }

        const movies = results.filter(item => item.media_type === 'movie');
        const people = results.filter(item => item.media_type === 'person');


        if (movies.length) renderMovies(movies, container);
        if (people.length) renderPeople(people, container);

        return results;

    } catch (err) {
        container.innerHTML = '<p>Something went wrong. Check your internetconnection and try again.</p>';
        return [];

    }
}
