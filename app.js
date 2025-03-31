const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(cors({ origin: process.env.ORIGIN }));

app.use(express.json());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to the database successfully!');
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
  })
.catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});

app.use('/', routes);

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
    });
})
