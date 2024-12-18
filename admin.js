// Data Management
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

// Form Elements
const loginForm = document.getElementById("loginForm");
const loginSection = document.getElementById("loginSection");
const adminDashboard = document.getElementById("adminDashboard");
const loginLink = document.getElementById("loginLink");
const filterDate = document.getElementById("filterDate");
const appointmentsTable = document.getElementById("appointmentsTable");
const filterButton = document.getElementById("filterButton");

loginForm.addEventListener("submit", handleLogin);
loginLink.addEventListener("click", showLoginForm);


filterButton.addEventListener("click", filterAppointments);


// Handle Login
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (username === "admin" && password === "admin123") {
    loginSection.classList.add("hidden");
    adminDashboard.classList.remove("hidden");
    renderAppointments();
  } else {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      loginSection.classList.add("hidden");
      customerDashboard.classList.remove("hidden");
    } else {
      document.getElementById("loginError").textContent = "Invalid credentials!";
    }
  }
}


// Show Login Form
function showLoginForm(event) {
  event.preventDefault();
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
}

  // Render Appointments (Admin)
function renderAppointments() {
  appointmentsTable.innerHTML = appointments
    .map(
      (a, index) =>
        `<tr>
          <td>${a.name}</td>
          <td>${a.date}</td>
          <td>${a.phone}</td>
          <td>${a.city}</td>
          <td>${a.description}</td>
          <td>${a.service}</td>
          <td><button onclick="deleteAppointment(${index})">Delete</button></td>
        </tr>`
    )
    .join("");
}

// Delete Appointment
function deleteAppointment(index) {
  appointments.splice(index, 1);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  renderAppointments();
}

// Filter Appointments
function filterAppointments() {
  const filterValue = filterDate.value;
  const filteredAppointments = appointments.filter((a) => a.date === filterValue);
  appointmentsTable.innerHTML = filteredAppointments
    .map(
      (a) =>
        `<tr>
          <td>${a.name}</td>
          <td>${a.date}</td>
          <td>${a.phone}</td>
          <td>${a.city}</td>
          <td>${a.description}</td>
          <td>${a.service}</td>
        </tr>`
    )
    .join("");
}

// Logout Logic

// Logout button functionality
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click', function() {
    // Clear login status from local storage
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to login page after logout
    window.location.href = 'admin.html'; // Replace with your actual login page
});

// Logout Logic
document.getElementById('logout-customer').addEventListener('click', () => {
  location.reload();
});

document.getElementById('logout-admin').addEventListener('click', () => {
  location.reload();
});
