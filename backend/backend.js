const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql2/promise');
// import mysql from 'mysql2/promise';
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Set The Image Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

// Init Image Upload
const upload = multer({ storage: storage });

const app = express();
const port = 4000;

// middleware
// ***********************
// cors middleware
// app.use(cors());

app.use(cors({ origin: "*" })); // Allow all origins


// parse application/json i.e json data
app.use(express.json());
// parse application/x-www-form-urlencoded i.e form data
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname, 'public/upoads'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'property_connect_database'
// });

// Create the connection to local database
// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'brian',
//     password: 'password',
//     database: 'property_connect_backend',
//   });

// Create the connection to remote database
const connection = mysql.createPool({
    port: 3306,
    host: 'sql.freedb.tech',
    user: 'freedb_brian-oyaro',
    password: '?%PNCbpU@BWEjb3',
    database: 'freedb_brian-oyaro-database',
  });

app.post('/register', async (req, res) => {
    // role = seller | buyer
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [ results ] = await connection.query('INSERT INTO users (email, role, password) VALUES (?, ?, ?)', [email, role, hashedPassword]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
        return
    }
    res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
    // role = buyer | seller to separate their landing pages
    let { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Email and password required');
        return;
    }
    const [ results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
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
    res.json({ token: token, role: user.role, message: 'User logged in successfully' });
});


// Upload Rental Route (For Homeowners)
app.post('/upload-rental', upload.single('image'), async (req, res) => {
    // status = available | rented
    const { title, description, price, location, owner_id, property_type } = req.body;
    let imageUrl = '/uploads/default.jpg';
    if (req.file) {
        imageUrl = '/uploads/' + req.file.filename;
    }
    
    // check if rental already exists to prevent duplicates
    const [ results_1 ] = await connection.query('SELECT * FROM rentals WHERE title = ? AND owner_id = ?', [title, owner_id]);
    if (results_1.length > 0) {
        return res.status(400).json({ error: 'Rental already exists' });
    }


    try {
        const [ results_1 ] = await connection.query('INSERT INTO rentals (title, description, price, location, owner_id, property_type, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)', [title, description, price, location, owner_id, property_type, imageUrl]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
        return;
    }
    res.json({ message: 'Rental uploaded successfully' });
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
    try {
        let [ results_1, rows_1 ] = await connection.query('UPDATE rentals SET status = "rented" WHERE id = ?', [rental_id]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
        return;
    }
    try {
        let [ results_2, rows_2 ] = await connection.query('INSERT INTO bookings (rental_id, user_id) VALUES (?, ?)', [rental_id, user_id]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
        return;
    }
    let [ results_3 ] = await connection.query('SELECT * FROM rentals WHERE id = ?', [results_2.insertId]);
    res.json({ bookedRental: results_3, message: 'Rental booked successfully' });
});
  
// Get Rentals with Filtering
app.get('/rentals', async (req, res) => {
    const { location, minPrice, maxPrice, propertyType } = req.query;
    // We should serch for avilable rentals only
    //let sql = 'SELECT * FROM rentals WHERE status = "available"';
    let sql = 'SELECT * FROM rentals WHERE 1=1';
    const params = [];
    if (location) {
        sql += ' AND location LIKE ?';
        // params.push(location);
        params.push(`%${location}%`);
    }
    if (minPrice) {
        sql += ' AND price >= ?';
        params.push(minPrice);
    }
    if (maxPrice) {
        sql += ' AND price <= ?';
        params.push(maxPrice);
    }
    if (propertyType) {
        sql += ' AND property_type = ?';
        params.push(propertyType);
    }
    const [ results ] = await connection.query(sql, params);
    res.json({ rentals: results });
});

// get rentals belonging to a particular user
app.post('/my-rentals', async (req, res) => {
    const { owner_id }= req.body;
    let sql = 'SELECT * FROM rentals WHERE owner_id = ?';
    const [ results ] = await connection.query(sql, owner_id);
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


// because I want to deploy on verce
module.exports = app;
// Backend
// inspect: https://vercel.com/brianoyaros-projects/backend/4NCXibDDFQ3bYmY2nt1WAd7QQKsg 
// https://backend-osz5ddmwc-brianoyaros-projects.vercel.app/

//Froentend
//🔍  Inspect: https://vercel.com/brianoyaros-projects/frontend/2R76wQr7b8CHMZ1myiocrM5S3QVh 
// ✅  Production: https://frontend-1yh6pk40l-brianoyaros-projects.vercel.app 