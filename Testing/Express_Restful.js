const express = require('express');
const app = express();

const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Auckland University of Technolgy ', location: 'Auckland' },
    { id: 2, title: 'Data Analyst', company: 'Trade me LTD', location: 'Wellington' }
];

app.get('/', (req, res) => {
    res.send('Welcome to HireHub!');
});

// Route to get all jobs
app.get('/api/jobs', (req, res) => {
    res.json(jobs);
});

// Route to get a job by ID
app.get('/api/jobs/:id', (req, res) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id));
    if (!job) return res.status(404).send('Job not found');
    res.json(job);
});

app.listen(3000, () => {
    console.log('API server running at http://localhost:3000/');
});
