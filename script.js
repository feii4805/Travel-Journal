// document.getElementById('restaurantForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const location = document.getElementById('cuisine').value;
//     fetchRestaurants(location);
// });

// function fetchRestaurants(location) {
//     // Replace with the correct API endpoint and query parameter
//     fetch(`https://artgeogallery.onrender.com//api/restaurants?location=${location}`)
//         .then(response => response.json())
//         .then(data => {
//             // Assuming the data contains latitude and longitude
//             updateMap(data.latitude, data.longitude, data.restaurants);
//         })
//         .catch(error => console.error('Error:', error));
// }

// function updateMap(latitude, longitude, restaurants) {
//     // Initialize the map with the given latitude and longitude
//     const map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: latitude, lng: longitude },
//         zoom: 15
//     });

//     // Place markers for each restaurant
//     restaurants.forEach(restaurant => {
//         new google.maps.Marker({
//             position: { lat: restaurant.latitude, lng: restaurant.longitude },
//             map: map,
//             title: restaurant.name
//         });
//     });
// }

document.addEventListener('DOMContentLoaded', function () {
    const countryInput = document.getElementById('CountryInput');
    const dateInput = document.getElementById('DateInput');
    const journalEntryTextarea = document.getElementById('JournalEntry');
    const submitEntryButton = document.getElementById('submitEntry');
    const journalContainer = document.getElementById('journalContainer');

    const countryCoordinates = {
        "USA": { latitude: 37.0902, longitude: -95.7129 },
        "UK": { latitude: 55.3781, longitude: -3.4360 },
        "France": { latitude: 46.2276, longitude: 2.2137 },
        "Italy": { latitude: 41.8719, longitude: 12.5674 },
"Greece": { latitude: 39.0742, longitude: 21.8243 },
"Germany": { latitude: 51.1657, longitude: 10.4515 },
"Egypt": { latitude: 26.8206, longitude: 30.8025 },
"Japan": { latitude: 36.2048, longitude: 138.2529 },
"China": { latitude: 35.8617, longitude: 104.1954 },
    "Mexico": { latitude: 23.6345, longitude: -102.5528 },
    "India": { latitude: 20.5937, longitude: 78.9629 },
    "Turkey": { latitude: 38.9637, longitude: 35.2433 },
    "Russia": { latitude: 61.5240, longitude: 105.3188 },
    "Brazil": { latitude: -14.2350, longitude: -51.9253 },
    "Canada": { latitude: 56.1304, longitude: -106.3468 },
    "Australia": { latitude: -25.2744, longitude: 133.7751 },
    "South Africa": { latitude: -30.5595, longitude: 22.9375 },
    "Spain": { latitude: 40.4637, longitude: -3.7492 },
    "Netherlands": { latitude: 52.1326, longitude: 5.2913 },
    "South Korea": { latitude: 35.9078, longitude: 127.7669 },
    "Argentina": { latitude: -38.4161, longitude: -63.6167 },
    "Sweden": { latitude: 60.1282, longitude: 18.6435 },
    "Norway": { latitude: 60.4720, longitude: 8.4689 },
       
    };

    submitEntryButton.addEventListener('click', submitJournalEntry);

    function submitJournalEntry() {
        const country = countryInput.value;
        const date = dateInput.value;
        const journalEntry = journalEntryTextarea.value;
        const coordinates = countryCoordinates[country];

      
        const entryElement = document.createElement('div');
        entryElement.classList.add('journal-entry');

       
        entryElement.innerHTML = `
            <h2>${country}</h2>
            <p>Date: ${date}</p>
            <p>${journalEntry}</p>
            <div class="map" id="map-${country.replace(/[^a-zA-Z0-9]/g, '-')}"></div>
        `;

        journalContainer.appendChild(entryElement);

    
        countryInput.value = '';
        dateInput.value = '';
        journalEntryTextarea.value = '';

        if (coordinates) {
            initializeMap(country, coordinates.latitude, coordinates.longitude, `map-${country.replace(/[^a-zA-Z0-9]/g, '-')}`);
        }
    }

    function initializeMap(country, latitude, longitude, mapId) {
        const map = L.map(mapId).setView([latitude, longitude], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

      
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup(country)
            .openPopup();

       
        map.invalidateSize();
    }
});
