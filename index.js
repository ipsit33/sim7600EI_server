const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET request handler
app.get('/', (req, res) => {
    res.send('Hello, I am your GPRS server');
});

// POST request handler
app.post('/', (req, res) => {

    const requestBody = req.body;
    console.log(requestBody);
    
    // Save request data to a text file
    fs.appendFile('post_requests.txt', JSON.stringify(requestBody)+'\n', (err) => {
        if(err){
            console.error("Error saving POST request: ",err);
            res.status(500).send("Error saving POST request");
        } else {
            console.log("POST request saved successfully: ",requestBody);
            res.status(200).send("POST request saved successfully");
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});