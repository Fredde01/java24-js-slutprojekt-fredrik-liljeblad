
// Funktion för att sortera filmer eller personer baserat på användares val
// Skapar shallow-copys för varje sätt att sortera datan på genom att använda [...data]
export function sortMoviesOrPeople(data, criteria) {
    switch (criteria) {
        case 'title-asc':
            return [...data].sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
        case 'title-desc':
            return [...data].sort((a, b) => (b.title || b.name).localeCompare(a.title || a.name));
        case 'popularity-asc':
            return [...data].sort((a, b) => a.popularity - b.popularity);
        case 'popularity-desc':
            return [...data].sort((a, b) => b.popularity - a.popularity);
        default:
            return data;

            
    }
}


