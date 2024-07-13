document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });

    // Mock data for featured spots
    const featuredSpots = [
        { name: 'Dice & Donuts', type: 'Cafe', city: 'Manchester', image: 'dice-donuts.jpg', description: 'Board games and sweet treats' },
        { name: 'Draughts Waterloo', type: 'Shop', city: 'London', image: 'meeple-mansion.jpg', description: 'Largest game selection in the UK' },
        { name: 'Cardboard Cafe', type: 'Cafe', city: 'Edinburgh', image: 'cardboard-cafe.jpg', description: 'Cozy spot for gamers' },
    ];

    const gallery = document.querySelector('.gallery');
    featuredSpots.forEach(spot => {
        const spotElement = document.createElement('div');
        spotElement.className = 'spot';
        spotElement.innerHTML = `
            <img src="images/${spot.image}" alt="${spot.name}">
            <div class="spot-content">
                <h3>${spot.name}</h3>
                <p>${spot.type} - ${spot.city}</p>
                <p>${spot.description}</p>
            </div>
        `;
        gallery.appendChild(spotElement);
    });
});