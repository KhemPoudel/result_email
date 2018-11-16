const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./route/user');

const app = express();

//Bodyparser
app.use(bodyParser.json());
app.use('/user', user);

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5700;

app.listen(port, () => console.log(`Server started on port ${port}`));

