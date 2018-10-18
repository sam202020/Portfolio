// importing dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();


// setting up the server
const port = 3001 || 3002; 
const server = express();


// configuring the database


// connecting to the database


// setting up middleware
server.use(express.json());
server.use(cors());

// test route
server.get('/', (req, res) => res.send(`The server is up and running!`));


// setting up routers
// initializing the server
server.listen(port, () => console.log(`The server is listening on port ${port}`));

module.exports = server;