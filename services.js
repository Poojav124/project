// services.js

// This will run when the page is loaded in the browser
window.onload = function() {
    loadServices();
};


// Fetch service requests
fetch('http://localhost:15076/api/service-requests')
  .then(response => response.json())
  .then(data => {
    console.log('Service Requests:', data);
    // Update your frontend UI with the fetched data
  })
  .catch(error => console.error('Error fetching service requests:', error));


function loadServices() {
    fetch('http://localhost:15076/api/service-requests')
        .then(response => response.json())
        .then(data => {
            const servicesContainer = document.getElementById('servicesContainer');
            servicesContainer.innerHTML = ''; // Clear any existing content

            // Iterate over the services and display them
            data.forEach(service => {
                const serviceDiv = document.createElement('div');
                serviceDiv.classList.add('service');
                serviceDiv.innerHTML = `
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <button class="book-now-btn" onclick="bookService(${service.id})">Book Now</button>
                `;
                servicesContainer.appendChild(serviceDiv);
            });
        })
        .catch(error => {
            console.error('Error loading services:', error);
        });
}

function showPopup(message) {
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function showPopup(points) {
    const popupMessage = document.getElementById("popup-message");
    popupMessage.innerHTML = ""; // Clear any previous content

    // Create list items for each point
    points.forEach(point => {
        const listItem = document.createElement("li");
        listItem.textContent = point;
        popupMessage.appendChild(listItem);
    });

    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Close popup when clicking outside the content
document.getElementById("popup").addEventListener("click", function (event) {
    const popupContent = document.querySelector(".popup-content");
    if (!popupContent.contains(event.target)) {
        closePopup();
    }
});


// Close the modal when clicking the close button
document.getElementById('close-btn').onclick = function() {
document.getElementById('service-detail-modal').style.display = 'none';
}

// Close the modal if the user clicks outside of the modal content
window.onclick = function(event) {
if (event.target === document.getElementById('service-detail-modal')) {
    document.getElementById('service-detail-modal').style.display = 'none';
}
}

function bookService(serviceId) {
    // Logic to book the service (e.g., navigate to the service request page)
    window.location.href = `service-request.html?serviceId=${serviceId}`;
}

// Function to navigate to the service request page
function navigateToServiceRequest(serviceId) {
    window.location.href = `service-request.html?serviceId=${serviceId}`;
}
