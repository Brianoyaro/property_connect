const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql2/promise');
// import mysql from 'mysql2/promise';
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// middleware
// ***********************
// cors middleware
app.use(cors());
// parse application/json i.e json data
app.use(express.json());
// parse application/x-www-form-urlencoded i.e form data
app.use(express.urlencoded({ extended: true }));


// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'property_connect_database'
// });

// Create the connection to database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'brian',
    password: 'password',
    database: 'property_connect_backend',
  });

app.post('/register', async (req, res) => {
    // role = owner | buyer
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [ results ] = await connection.query('INSERT INTO users (email, role, password) VALUES (?, ?, ?)', [email, role, hashedPassword]);

    // Fetch the inserted user because insert operation only returns metadata i.e results
    const [rows] = await connection.query(
        'SELECT id, email, role FROM users WHERE id = ?',
        [results.insertId]
    );
    res.json({ user: rows[0], results: results, message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
    // role = owner | buyer to separate their landing pages
    const { email, password, role } = req.body;

    const [ results] = await connection.query('SELECT * FROM users WHERE email = ? AND role = ?', [email, role]);
    // console.log(results[0]);
    if (results.length === 0) {
        // no user found
        res.status(401).send('User not found');
        return;
    }
    // compare passwords
    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        res.status(401).send('Invalid email or password');
        return;
    }
    // create token
    const token = jwt.sign({ id: user.id }, 'supersecretkey', { expiresIn: '1h' });
    res.json({ token: token, message: 'User logged in successfully' });
});


// Upload Rental Route (For Homeowners)
app.post('/upload-rental', async (req, res) => {
    // status = available | rented
    const { title, description, price, location, owner_id, property_type } = req.body;
    // check if rental already exists to prevent duplicates
    const [ results_1 ] = await connection.query('SELECT * FROM rentals WHERE title = ? AND owner_id = ?', [title, owner_id]);
    if (results_1.length > 0) {
        return res.status(400).json({ error: 'Rental already exists' });
    }

    // const image = req.file.filename;
    const [ rows ] = await connection.query('INSERT INTO rentals (title, description, price, location, owner_id, property_type) VALUES (?, ?, ?, ?, ?, ?)', [title, description, price, location, owner_id, property_type]);
    const [ results ] = await connection.query('SELECT * FROM rentals WHERE id = ?', [rows.insertId]);
    res.json({ rental: results[0], message: 'Rental uploaded successfully' });
});
  
// Book Rental Route
app.post('/book-rental', async (req, res) => {
    // WE CAN PASS THEM IN FORM>HIDDEN INPUTS FOR SECURITY REASONS
    const { rental_id, user_id } = req.body;
    // checks to ascertain that the rental is available
    let [ results ] = await connection.query('SELECT * FROM rentals WHERE id = ?', [rental_id]);
    if (results.length === 0) {
        // not found
        return res.status(404).json({ error: 'Rental not found' });
    }
    // already booked thus not available for booking
    let rental = results[0];
    if (rental.status === 'rented') {
        return res.status(400).json({ error: 'Rental already rented' });
    }
    // update rental status to rented. Should incorporate payment later because a person can boook but fail to pay later on.
    let [ results_1, rows_1 ] = await connection.query('UPDATE rentals SET status = "rented" WHERE id = ?', [rental_id]);
    let [ results_2, rows_2 ] = await connection.query('INSERT INTO bookings (rental_id, user_id) VALUES (?, ?)', [rental_id, user_id]);
    let [ results_3 ] = await connection.query('SELECT * FROM rentals WHERE id = ?', [results_2.insertId]);
    res.json({ bookedRental: results_3, message: 'Rental booked successfully' });
});
  
// Get Rentals with Filtering
app.get('/rentals', async (req, res) => {
    const { location, maxPrice, property_type } = req.query;
    // We should serch for avilable rentals only
    let sql = 'SELECT * FROM rentals WHERE status = "available"';
    //let sql = 'SELECT * FROM rentals WHERE 1=1';
    const params = [];
    if (location) {
        sql += ' AND location = ?';
        params.push(location);
    }
    if (maxPrice) {
        sql += ' AND price <= ?';
        params.push(maxPrice);
    }
    if (property_type) {
        sql += ' AND property_type = ?';
        params.push(property_type);
    }
    const [ results, rows ] = await connection.query(sql, params);
    res.json({ rentals: results });
});

// Get a rental given its id
app.get('/rentals/:id', async (req, res) => {
    const { id } = req.params;
    const [ results ] = await connection.query('SELECT * FROM rentals WHERE id = ?', [id]);
    if (results.length === 0) {
        return res.status(404).json({ error: 'Rental not found' });
    }
    res.json({ rental: results[0] });
});

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});