// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');



// Initialize Express
const app = express();
const PORT = 2600;
app.use(cors());
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: 'root',
    database: 'car_service'
});


// Check MySQL connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

     // Query to check if the email and password match in the database
     const query = `SELECT * FROM admins WHERE email = ? AND password = ?`;
     db.query(query, [email, password], (err, results) => {
         if (err) {
             return res.status(500).json({ message: 'Server error' });
         }
         if (results.length > 0) {
             // Success: Redirect to admin panel or return a success message
             res.status(200).json({ message: 'Login successful', user: results[0] });
         } else {
             // Invalid credentials
             res.status(401).json({ message: 'Invalid email or password' });
         }
     });
 });


// Example route to fetch services
app.get('/api/services-requests', (req, res) => {
    const query = 'SELECT * FROM services_requests';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
           res.status(500).send('Error fetching services');
        }else{
        res.json(results);
        }
    });
});

// API Endpoint: Add new service request
app.post('/api/service-requests', (req, res) => {
    const { customer_name, car_brand, car_model, service_type, appointment_date } = req.body;
    const query = `INSERT INTO service_requests (customer_name, car_brand, car_model, service_type, appointment_date) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [customer_name, car_brand, car_model, service_type, appointment_date], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error adding service request');
      } else {
        res.status(200).send('Service request added successfully');
      }
    });
  });

// Start the server
const port = 15076;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${15076}`);
});
