const express = require('express');
const router = express.Router();


// Method not found
router.use('/', (req, res) => {
    res.status(404).send({
        response: '404 Not Found'
    })
});

// SyntaxError Handler
router.use(function (err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.sendStatus(400); // Bad request
    }
    next();
})


module.exports = router;