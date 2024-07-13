document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchTitle = document.querySelector('h1');

    // Get the search term from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');

    // Update the title with the search term
    if (searchTerm) {
        searchTitle.textContent = `Search Results for "${searchTerm}"`;
    }

    // Mock data for search results
    const mockResults = [
        { name: "Dice & Donuts", type: "cafe", city: "Manchester", image: "dice-donuts.jpg", description: "Board games and sweet treats" },
        { name: "Draughts Waterloo", type: "shop", city: "London", image: "meeple-mansion.jpg", description: "Largest game selection in the UK" },
        { name: "Cardboard Cafe", type: "cafe", city: "Edinburgh", image: "cardboard-cafe.jpg", description: "Cozy spot for gamers" },
        { name: "Tabletop Titans", type: "community", city: "Birmingham", image: "tabletop-titans.jpg", description: "Weekly game nights and tournaments" },
        { name: "The Dragon's Hoard", type: "shop", city: "Bristol", image: "dragons-hoard.jpg", description: "Rare and collectible games" },
        { name: "Pawns & Puzzles", type: "cafe", city: "Glasgow", image: "pawns-puzzles.jpg", description: "Chess club and game cafe" }
    ];

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'result-item';
            resultElement.innerHTML = `
                <img src="images/${result.image}" alt="${result.name}">
                <div class="result-content">
                    <h2><a href="venue.html?id=${result.id}">${result.name}</a></h2>
                    <p>${result.type} - ${result.city}</p>
                    <p>${result.description}</p>
                </div>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }

    function filterResults(filter) {
        let filteredResults = mockResults;
        
        if (filter !== 'all') {
            filteredResults = mockResults.filter(result => result.type === filter);
        }

        if (searchTerm) {
            filteredResults = filteredResults.filter(result => 
                result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                result.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                result.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        displayResults(filteredResults);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterResults(button.dataset.filter);
        });
    });

    // Initial display of filtered results
    filterResults('all');
});

// search-results.js
let map;

function initMap() {
    // Create a new map centered in a default location (e.g., London)
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 51.5074, lng: -0.1278 },
        zoom: 10
    });

    // Add a click event listener to the map
    map.addListener('click', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        alert(`You clicked the map at latitude: ${lat} and longitude: ${lng}`);
        // Implement search functionality here
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const results = [
        { name: "Dice & Donuts", lat: 53.4808, lng: -2.2426 },
        { name: "Draughts Waterloo", lat: 53.4808, lng: -2.2426 },
        { name: "Cardboard Cafe", lat: 55.9533, lng: -3.1883 }
    ];

    function addMarkers() {
        const results = [
            { name: "Dice & Donuts", lat: 53.4808, lng: -2.2426 },
            { name: "Draughts Waterloo", lat: 51.5033, lng: -0.1145 },
            { name: "Cardboard Cafe", lat: 55.9533, lng: -3.1883 }
        ];
    
        results.forEach(result => {
            const marker = new google.maps.Marker({
                position: { lat: result.lat, lng: result.lng },
                map: map,
                title: result.name
            });
    
            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${result.name}</h3>`
            });
    
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
    }
    initMap();
    addMarkers();
});


