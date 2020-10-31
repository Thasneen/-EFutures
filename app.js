const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const auth = require('./routes/auth')
require('dotenv').config();

const User = require('./models/User');
const isAuth = require('./middlewares/isAuth');


const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(isAuth);
app.use(auth)
const PORT = 3000;




mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`, { useNewUrlParser: true })
    .then(() => {
        app.listen(process.env.PORT || PORT, () => {
            console.log(`Listening on  http://localhost:${PORT}`)
        });
    })
    .catch(e => console.error(e));
;