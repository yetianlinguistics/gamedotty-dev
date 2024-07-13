document.addEventListener('DOMContentLoaded', () => {
    // Get the venue ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const venueId = urlParams.get('id');

    // Mock data for a venue (in a real application, this would be fetched from a server)
    const venueData = {
        id: 1,
        name: "Draughts Waterloo",
        type: "Cafe",
        image: "draughts-waterloo.jpg",
        description: "Draughts Waterloo is a cozy board game cafe in the heart of London. We offer a wide selection of board games, delicious donuts, and great coffee. Whether you're a seasoned gamer or new to the world of board games, our friendly staff is here to help you find the perfect game for your group.",
        address: "Arch 16 Leake St, London SE1 7NN",
        hours: [
            { day: "Monday - Thursday", time: "10:00 AM - 10:00 PM" },
            { day: "Friday - Saturday", time: "10:00 AM - 12:00 AM" },
            { day: "Sunday", time: "12:00 PM - 8:00 PM" }
        ],
        contact: {
            phone: "0123 456 789",
            email: "info@diceanddonuts.com"
        },
        reviews: [
            { user: "Alice", rating: 5, comment: "Great selection of games and amazing donuts!" },
            { user: "Bob", rating: 4, comment: "Friendly staff and good atmosphere. Could use more tables." }
        ]
    };

    // Populate the page with venue data
    document.title = `${venueData.name} - GameDotty`;
    document.getElementById('venue-name').textContent = venueData.name;
    document.getElementById('venue-type').textContent = venueData.type;
    document.getElementById('venue-image').src = `images/${venueData.image}`;
    document.getElementById('venue-image').alt = venueData.name;
    document.getElementById('venue-description').textContent = venueData.description;
    document.getElementById('venue-address').textContent = venueData.address;

    const hoursListElement = document.getElementById('venue-hours');
    venueData.hours.forEach(hour => {
        const li = document.createElement('li');
        li.textContent = `${hour.day}: ${hour.time}`;
        hoursListElement.appendChild(li);
    });

    document.getElementById('venue-contact').innerHTML = `
        Phone: ${venueData.contact.phone}<br>
        Email: ${venueData.contact.email}
    `;

    const reviewsListElement = document.getElementById('reviews-list');
    venueData.reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <h3>${review.user}</h3>
            <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
            <p>${review.comment}</p>
        `;
        reviewsListElement.appendChild(reviewElement);
    });

    // Add review button functionality (for demonstration purposes)
    document.getElementById('add-review-btn').addEventListener('click', () => {
        alert('Review functionality coming soon!');
    });
});