const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors())

const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded



mongoose.connect('mongodb://tester1:tester1@ds057862.mlab.com:57862/ecommerce-db', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('db connection SUCCESS')
    })
    .catch((error) => {
        console.log('db connection FAILED')
    });


var schema = new mongoose.Schema({
    name: 'string',
    size: 'string'
});
var Tank = mongoose.model('Tank', schema);

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (req, res) => {
    var data = new Tank(req.body); 
    data.save(function (err) {
        if (err) {
            return handleError(err)
        };
        res.send('SAVED!')
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));