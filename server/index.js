'use strict';

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

// DB setup
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
router(app);

// Server setup
const port = process.env.PORT || 3090;
const hostname = '127.0.0.1';
const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
