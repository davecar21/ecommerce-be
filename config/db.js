
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);   

mongoose.connect('mongodb://tester1:tester1@ds057862.mlab.com:57862/ecommerce-db', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('db connection SUCCESS')
    })
    .catch((error) => {
        console.log('db connection FAILED')
    });


module.exports = mongoose;