const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse text/plain bodies
app.use(express.text());

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

// POST request handler for JSON format
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

// POST request handler for text/plain format
app.post('/', (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);

    // Save request data to a text file
    fs.appendFile('post_requests.txt', requestBody + '\n', (err) => {
        if (err) {
            console.error("Error saving POST request: ", err);
            res.status(500).send("Error saving POST request");
        } else {
            console.log("POST request saved successfully: ", requestBody);
            res.status(200).send("POST request saved successfully");
        }
    });
});

// PUT request handler for JSON format
app.put('/', (req, res) => {
    const updatedData = req.body;
    console.log(updatedData);

    // Save updated data to the file
    fs.writeFile('post_requests.txt', JSON.stringify(updatedData) + '\n', (err) => {
        if (err) {
            console.error("Error updating data:", err);
            res.status(500).send("Error updating data");
        } else {
            console.log("Data updated successfully:", updatedData);
            res.status(200).send("Data updated successfully");
        }
    });
});

// PUT request handler for text/plain format
app.put('/', (req, res) => {
    const updatedData = req.body;
    console.log(updatedData);

    // Save updated data to the file
    fs.writeFile('post_requests.txt', updatedData + '\n', (err) => {
        if (err) {
            console.error("Error updating data:", err);
            res.status(500).send("Error updating data");
        } else {
            console.log("Data updated successfully:", updatedData);
            res.status(200).send("Data updated successfully");
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
