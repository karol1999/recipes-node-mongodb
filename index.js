const express = require('express');
const api = require('./src/api')
const errorHandler = require("./src/middlewares/errorHandler");
const mongoose = require('mongoose')

const port = 3000;
const app = express();

mongoose.connect('mongodb://localhost/recipes-db', {debug: true, useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.once('open', () => {
    console.log('Successfully connected to database');
})

mongoose.connection.on('error', () => {
    console.error('Couldn\'t connect to database');
})

app.use(express.json());
app.use('/api', api)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
})