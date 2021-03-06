const express = require('express');
const router = express.Router();
const auth = require('../utils/middleware/auth');
const authAdmin = require('../utils/middleware/authAdmin');

const UserModel = require('../model/userModel');
var _ = require('lodash');

router.get('/', async (req, res) => {
    try {
        const result = await UserModel.getUser();
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send({
            response: 'FAILED',
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await UserModel.findUser(req.params.id);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send({
            response: 'FAILED',
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await UserModel.postUser(req.body);
        return res.status(200).send({
            response: 'SUCCESS',
            message: {
                username: result.username
            }
        });
    } catch (error) {
        let errorMsg=[];
        _.forEach(error.errors, function (value, key) {
            errorMsg.push(value.message);
        });
        return res.status(400).send({
            response: 'FAILED',
            message: errorMsg
        });
    }
});

router.put('/', authAdmin, async (req, res) => {
    try {
        const result = await UserModel.putUser(req.body);
        
        return res.status(200).send({
            response: 'SUCCESS',
            message: {
                username: result
            }
        });
    } catch (error) {
        return res.status(400).send({
            response: 'FAILED',
            message: error.message.message
        });
    }
});

module.exports = router;