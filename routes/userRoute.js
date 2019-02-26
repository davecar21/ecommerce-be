const express = require('express');
const router = express.Router();

const UserModel = require('../model/userModel');
var _ = require('lodash');

router.get('/', async (req, res) => {
    try {
        const result = await UserModel.getUser();
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send({
            response: 'FAILED',
            message: error
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
            message: error
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
        let errorMsg = '';
        _.forEach(error.errors, function (value, key) {
            errorMsg = value.message
        });
        return res.status(400).send({
            response: 'FAILED',
            message: error
        });
    }
});

router.put('/', async (req, res) => {
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
            message: error
        });
    }
});

router.post('/auth', async (req, res) => {
    try {
        const result = await UserModel.auth(req.body);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(401).send({
            response: 'FAILED',
            message: error.message
        });
    }
});

module.exports = router;