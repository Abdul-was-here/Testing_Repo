const express = require('express');
const app = express();

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Welcome to HireHub!');
});

// Define a route for job listings
app.get('/jobs', (req, res) => {
    res.send('Here are the available jobs.');
});

// Server listens on port 3000
app.listen(3000, () => {
    console.log('HireHub app listening at http://localhost:3000/');
});
