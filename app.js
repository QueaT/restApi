const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/ordersRoute');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');


const cors = require('cors')
app.use(cors());
app.options('*', cors());




mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@cluster0-ofgrv.mongodb.net/test?retryWrites=true`, {
    useNewUrlParser: true
})


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());



app.use('/login', loginRoute)
app.use('/orders', orderRoute)
app.use('/products', productRoute);
app.use('/register', registerRoute)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;