const express = require('express');
const cors = require('cors');
var morgan = require('morgan')
const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan('tiny'));

// Config
const db = require('./config/db');
const config = require('./config/config');

// Routes
const userRoute = require('./routes/userRoute');

// Error Handler
const routeErrorHandler = require('./utils/errorHandler/routeErrorHandler');

// Middleware
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Ecommerce API!'
    })
});

app.use('/user', userRoute);

// Error Handling
app.use(routeErrorHandler);



app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));