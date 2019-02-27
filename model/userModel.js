const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('../config/db');
const config = require('../config/config');
const Schema = mongoose.Schema;
const _ = require('lodash');


let UserMethod = {}

let userSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: [true, 'userType is required.'],
        enum: ['admin', 'moderator', 'customer', 'seller'],
        default: 'customer'
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
            new: true,
            runValidators: true
        });
    return result;
}

UserMethod.auth = async (user) => {

    const authUser = await User.findOne({
        username: user.username
    });
    if (!authUser) throw new Error('Auth failed!');;

    const compPassword = await bcrypt.compare(user.password, authUser.password);
    if (compPassword) {
        const payload = _.pick(authUser, ['_id', 'username', 'userType', 'email']);
        const token = await jwt.sign(payload, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } else {
        throw new Error('Auth failed!');
    }


}


UserMethod.User = User;
module.exports = UserMethod;