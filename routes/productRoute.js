const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authSeller = require('../utils/middleware/authSeller');

const ProductModel = require('../model/productModel');
var _ = require('lodash');

router.get('/', async (req, res) => {
    try {
        const result = await ProductModel.getProduct();
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
        const result = await ProductModel.findProduct(req.params.id);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send({
            response: 'FAILED',
            message: error
        });
    }
});

router.post('/', authSeller, async (req, res) => {
    try {
        req.body.userId = res.locals.token._id;
        const result = await ProductModel.postProduct(req.body);
        return res.status(200).send({
            response: 'SUCCESS',
            message: {
                result
            }
        });
    } catch (error) {
        let errorMsg = [];
        _.forEach(error.errors, function (value, key) {
            errorMsg.push(value.message);
        });
        return res.status(400).send({
            response: 'FAILED',
            message: errorMsg
        });
    }
});

router.put('/', authSeller, async (req, res) => {
    try {
        const result = await ProductModel.putProduct(req.body);
        return res.status(200).send({
            response: 'SUCCESS',
            message: {
                result
            }
        });
    } catch (error) {
        return res.status(400).send({
            response: 'FAILED',
            message: error
        });
    }
});

router.delete('/', authSeller, async (req, res) => {
    try {
        const result = await ProductModel.deleteProduct(req.body._id);
        return res.status(200).send({
            response: 'SUCCESS',
            message: {
                result
            }
        });
    } catch (error) {
        return res.status(400).send({
            response: 'FAILED',
            message: error
        });
    }
});

module.exports = router;