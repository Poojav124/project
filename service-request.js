// Import necessary modules
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost3306', // Replace with your MySQL server hostname
  user: 'root', // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'car_service', // Replace with your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Endpoint to handle service requests (POST)
app.post('service-request', (req, res) => {
  const { customer_name, car_model, issue_description } = req.body;

  // Validate input data
  if (!customer_name || !car_model || !issue_description) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (customer_name.trim() === "") {
    document.getElementById("customer_name-error").textContent = "Customer name is required.";
    valid = false;
}
// Check if the customer name length is within the range of 3 to 50 characters
else if (customer_name.length < 3 || customer_name.length > 50) {
    document.getElementById("customerName-error").textContent = "Customer name must be between 3 and 50 characters.";
    valid = false;
}
// Check if the customer name contains only alphabetic characters
else if (!/^[A-Za-z\s]+$/.test(customer_name)) {
    document.getElementById("customer_name-error").textContent = "Customer name must contain only alphabetic characters and spaces.";
    valid = false;
}

  // SQL query to insert the service request into the database
  const query = 'INSERT INTO service_requests (customer_name, car_model, issue_description) VALUES (?, ?, ?)';
  pool.query(query, [customer_name, car_model, issue_description], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error inserting service request.' });
    }
    // Respond with success and the inserted request ID
    res.status(201).json({ message: 'Service request submitted successfully.', id: results.insertId });
  });
});

// Endpoint to retrieve all service requests (GET)
app.get('service-requests', (req, res) => {
  const query = 'SELECT * FROM service_requests';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error retrieving service requests.' });
    }
    // Respond with all service requests
    res.status(200).json(results);
  });
});

// Start the server on port 2600
const port = 2600;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${2600}`);
});
