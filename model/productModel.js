const mongoose = require('../config/db');
const config = require('../config/config');
const Schema = mongoose.Schema;
const _ = require('lodash');

let ProductMethod = {}

let productSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productStatus: {
        type: String,
        required: true,
        enum: ['available', 'outOfStock', 'notAvailable'],
        default: 'available'
    }
}, {
    timestamps: true
});

let Product = mongoose.model('Product', productSchema);

ProductMethod.getProduct = async () => {
    const result = await Product.find();
    return result;
}

ProductMethod.findProduct = async (productId) => {
    const result = await Product.find({
        _id: productId
    });
    return result;
}

ProductMethod.postProduct = async (product) => {
    product._id = new mongoose.Types.ObjectId();
    const productData = new Product(product);
    const result = await productData.save();
    return result;
}

ProductMethod.putProduct = async (product) => {
    const result = await Product.findOneAndUpdate({
            _id: product._id
        },
        product, {
            new: true,
            runValidators: true
        });
    return result;
}

ProductMethod.deleteProduct = async (productId) => {
    const result = await Product.findByIdAndDelete(productId);
    return result;
}


ProductMethod.Product = Product;
module.exports = ProductMethod;