const mongoose = require('../config/db');
const config = require('../config/config');
const Schema = mongoose.Schema;
const _ = require('lodash');


let UserMethod = {}

let userSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
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
        enum: ['available', 'outOfStock'],
        default: 'available'
    }
});

let User = mongoose.model('User', userSchema);

UserMethod.getUser = async () => {
    const result = await User.find();
    return result;
}

UserMethod.findUser = async (userId) => {
    const result = await User.find({
        _id: userId
    });
    return result;
}

UserMethod.postUser = async (user) => {
    user._id = new mongoose.Types.ObjectId();
    user.password = await bcrypt.hash(user.password, config.saltRounds);
    const userData = new User(user);
    const result = await userData.save();
    return result;
}

UserMethod.putUser = async (user) => {
    user.password = await bcrypt.hash(user.password, config.saltRounds);
    const result = await User.findOneAndUpdate({
            _id: user._id
        },
        user, {
            new: true
        });
    return result;
}



UserMethod.User = User;
module.exports = UserMethod;