const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql/2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'property_connect'
});

// db connection
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MySQL Connected...');
    }
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
        // internal server error
        if (err) {
            console.log(err);
            return res.status(500).json({error: err});
        }
        res.json({ message: 'User registered successfully' });
    });
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        // internal server error
        if (err) {
            console.log(err);
            return res.status(500).send({error: err});
        }
        if (result.length === 0) {
            // no user found
            res.status(401).send('User not found');
            return
        }
        // compare passwords
        const user = result[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).send('Invalid email or password');
            return
        }
        // create token
        const token = jwt.sign({ id: user.id }, 'supersecretkey', { expiresIn: '1h' });
        res.json({ token: token, message: 'User logged in successfully' });
    })
});


// Upload Rental Route (For Homeowners)
app.post('/upload-rental', upload.single('image'), (req, res) => {
    const { title, description, price, location, owner_id } = req.body;
    const sql = 'INSERT INTO rentals (title, description, price, location, owner_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, price, location, owner_id], (err, result) => {
      if (err) {
        // internal server error
        return res.status(500).json({ error: err });
      }
      res.json({ message: 'Rental uploaded successfully' });
    });
  });
  
// Book Rental Route
app.post('/book-rental', (req, res) => {
    const { rental_id, user_id } = req.body;
    const sql = 'INSERT INTO bookings (rental_id, user_id) VALUES (?, ?)';
    db.query(sql, [rental_id, user_id], (err, result) => {
        if (err) {
            // internal server error
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Rental booked successfully' });
    });
});
  
// Get Rentals with Filtering
app.get('/rentals', (req, res) => {
    const { location, maxPrice } = req.query;
    let sql = 'SELECT * FROM rentals WHERE 1=1';
    const params = [];
    if (location) {
        sql += ' AND location = ?';
        params.push(location);
    }
    if (maxPrice) {
        sql += ' AND price <= ?';
        params.push(maxPrice);
    }
    db.query(sql, params, (err, results) => {
        if (err) {
            // insternal server error
            return res.status(500).json({ error: err });
        }
      res.json(results);
    });
  });

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});