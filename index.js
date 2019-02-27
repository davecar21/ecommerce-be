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
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

// Error Handler
const routeErrorHandler = require('./utils/errorHandler/routeErrorHandler');

// Middleware
const auth = require('./utils/middleware/auth');


//Routes
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Ecommerce API!'
    })
});

app.use('/auth', authRoute);
app.use('/user', auth, userRoute);
app.use('/product', auth, productRoute);

// Error Handling
app.use(routeErrorHandler);



app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));