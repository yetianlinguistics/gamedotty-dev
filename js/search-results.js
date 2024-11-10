document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchTitle = document.querySelector('h1');
    let allResults = [];

    // Get the search term from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');

    // Update the title with the search term
    if (searchTerm) {
        searchTitle.textContent = `Search Results for "${searchTerm}"`;
    }

    // Function to load and parse the CSV file
    function loadCSV() {
        console.log("Loading CSV file...");
        Papa.parse('data/gamedotty_list_dev.csv', {
            download: true,
            header: true,
            complete: function(results) {
                console.log("CSV file loaded and parsed.");
                console.log("Parsed Results:", results);
                allResults = results.data;
                // print the first result
                console.log("First result:", allResults[0]);
                filterResults('all');
                addMarkers(allResults);
            },
            error: function(error) {
                console.error("Error parsing CSV file:", error);
            }
        });
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        console.log("Displaying results:", results);
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
        let filteredResults = allResults;

        if (filter !== 'all') {
            filteredResults = allResults.filter(result => result.type.toLowerCase() === filter);
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

    loadCSV(); // Load the CSV file and initialize data
});

// Function to initialize the map
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

function addMarkers(results) {
    console.log("Adding markers to map:", results);
    results.forEach(result => {
        if (result.lat && result.lng) { // Ensure lat and lng are present
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(result.lat), lng: parseFloat(result.lng) },
                map: map,
                title: result.name
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${result.name}</h3>`
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }
    });
}

