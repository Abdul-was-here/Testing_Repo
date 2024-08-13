const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to HireHub!');
});

app.listen(3000, () => {
    console.log('HireHub app listening at http://localhost:3000/');
});
