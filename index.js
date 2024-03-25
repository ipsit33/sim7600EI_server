const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET request handler
app.get('/', (req, res) => {
    // Read contents of post_requests.txt file
    fs.readFile('post_requests.txt', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).send("Error reading file");
            return;
        }
        // Split data by newline to get individual requests
        const requests = data.trim().split('\n');
        // Get the latest request
        const latestRequest = requests[requests.length - 1];
        res.send('Latest POST request:\n' + latestRequest);
    });
});

// POST request handler
app.post('/', (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    
    // Save request data to a text file
    fs.appendFile('post_requests.txt', JSON.stringify(requestBody) + '\n', (err) => {
        if (err) {
            console.error("Error saving POST request: ", err);
            res.status(500).send("Error saving POST request");
        } else {
            console.log("POST request saved successfully: ", requestBody);
            res.status(200).send("POST request saved successfully");
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
