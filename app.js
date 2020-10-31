const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

const User = require('./models/User');
const isAuth = require('./middlewares/isAuth');
const authController = require('./controller/authController');

const app = express();
app.use(express.json());
app.use(morgan('combined'));

const PORT = 3000;

app.use(isAuth);

app.post('/register', authController.register)

app.post('/login', authController.login)

app.post('/profile', authController.profile);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`, { useNewUrlParser: true })
    .then(() => {
        app.listen(process.env.PORT || PORT, () => {
            console.log(`Listening on  http://localhost:${PORT}`)
        });
    })
    .catch(e => console.error(e));
;