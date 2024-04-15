// Your code here

//     fetch(`http://localhost:3000${id}`)
//     .then(function (response) {
//             return response.json();



// document.addEventListener('DOMContentLoaded', function() {
//     // get movie by id
//     function fetchMovieDetails(id) {
//         return fetch(`http://localhost:3000/films/${id}`)
//             .then(response => response.json())
//             .catch(error => console.error('Error fetching movie details:', error));
//     }

//     // get all movies to the web page
//     function fetchAllMovies() {
//         return fetch('http://localhost:3000/films')
//             .then(response => response.json())
//             .catch(error => console.error('Error fetching movies:', error));
//     }

//     // Function to update available tickets for a movie.
//     function updateAvailableTickets(id, ticketsSold) {
//         return fetch(`http://localhost:3000/films/${id}`, {
//             method: 'PATCH',//patch method to update partially
//             headers: {
//                 'Content-Type': 'application/json'
//             },
            
//         })
//         .then(response => response.json())
//         .catch(error => console.error('Error updating available tickets:', error));
//     }

//     // Function to buy a ticket for a movie
//     function buyTicket(movie) {
//         const remainingTickets = movie.capacity - movie.tickets_sold;
//         if (remainingTickets > 0) {
//             const updatedTicketsSold = movie.tickets_sold + 1;
//             updateAvailableTickets(movie.id, updatedTicketsSold)
//                 .then(updatedMovie => {
//                     // see purchased ticket
//                     document.getElementById('ticket-num').textContent = `${remainingTickets - 1} remaining tickets`;
//                     if (remainingTickets - 1 === 0) {
//                         document.getElementById('buy-ticket').textContent = 'Sold Out';
//                     }
//                     // Post the new ticket 
//                     const newTicket = {
//                         film_id: movie.id,
//                         number_of_tickets: 1
//                     };
//                     fetch('http://localhost:3000/tickets', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify(newTicket)
//                     })
//                     .then(response => response.json())
//                     .catch(error => console.error('Error posting new ticket:', error));
//                 });
//         } else {
//             alert('Sorry, this movie is sold out!');
//         }
//     }

//     // function for the delete button
//     function deleteFilm(id) {
//         fetch(`http://localhost:3000/films/${id}`, {
//             method: 'DELETE'
//         })
//         .then(() => {
//             // Remove the film from the frontend
//             const filmItem = document.getElementById(`film-${id}`);
//             if (filmItem) {
//                 filmItem.remove();
//             }
//         })
//         .catch(error => console.error('Error deleting film:', error));
//     }

//     // put movie menu
//     function renderMovies(movies) {
//         const filmsList = document.getElementById('films');
//         filmsList.innerHTML = ''; // Clear existing list
//         movies.forEach(movie => {
//             const listItem = document.createElement('li');
//             listItem.id = `film-${movie.id}`;
//             listItem.classList.add('film', 'item');
//             listItem.textContent = movie.title;
//             if (movie.capacity - movie.tickets_sold === 0) {
//                 listItem.classList.add('sold-out');
//             }
//            // delete button for removing movie
//             const deleteButton = document.createElement('button');
//             deleteButton.textContent = 'Delete';
//             deleteButton.addEventListener('click', () => {
//                 deleteFilm(movie.id);
//             });
//             listItem.appendChild(deleteButton);
//             filmsList.appendChild(listItem);
//         });
//     }

    
//     fetchAllMovies()
//         .then(movies => {
//             // Populate the films menu
//             renderMovies(movies);
//         });

//     // ticket buying event listener
//     document.getElementById('buy-ticket').addEventListener('click', function() {
//         fetchMovieDetails(1)
//             .then(movie => {
//                 buyTicket(movie);
//             });
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    const filmsList = document.getElementById('films');

    // Fetch film data from the server
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
            // Iterate over each film and add it to the films list
            data.films.forEach(film => {
                // Create a new list item for each film
                const listItem = document.createElement('li');
                listItem.classList.add('film', 'item');
                listItem.textContent = film.title;

                // Add an event listener to show film details when clicked
                listItem.addEventListener('click', function() {
                    // Update poster image
                    document.getElementById('poster').src = film.poster;

                    // Update film details
                    document.getElementById('title').textContent = film.title;
                    document.getElementById('runtime').textContent = `${film.runtime} minutes`;
                    document.getElementById('showtime').textContent = film.showtime;
                    const remainingTickets = film.capacity - film.tickets_sold;
                    document.getElementById('ticket-num').textContent = `${remainingTickets} remaining tickets`;
                    document.getElementById('film-info').textContent = film.description;
                });

                // Append the list item to the films list
                filmsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching films:', error));
});
