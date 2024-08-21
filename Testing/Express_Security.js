const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

app.use(express.json());

const users = []; // Simulating a user database

// User registration route
app.post('/api/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.send('User registered!');
});

// Route to get the main page
app.get('/', (req, res) => {
    res.send('Welcome to HireHub!');
});

// User login route
app.post('/api/login', async (req, res) => {
    const user = users.find(u => u.username === req.body.username);
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send('Invalid username or password');
    }

    const token = jwt.sign({ username: user.username }, 'jwtPrivateKey');
    res.send(token);
});

// Protected route example
app.get('/api/protected', (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        res.send('Protected data accessed by ' + decoded.username);
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
});

app.listen(3000, () => {
    console.log('Auth server running at http://localhost:3000/');
});
