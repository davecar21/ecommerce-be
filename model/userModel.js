var jwt = require('jsonwebtoken');
const mongoose = require('../config/db');
const Schema = mongoose.Schema;
var _ = require('lodash');


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
        enum: ['admin', 'moderator', 'customer', 'seller']
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
    const userData = new User(user);
    const result = await userData.save();
    return result;
}

UserMethod.putUser = async (user) => {
    1
    console.log('[model]', user)
    const result = await User.findOneAndUpdate({
        _id: user._id
    }, user, {
        new: true
    });
    return result;
}

UserMethod.auth = async (user) => {

    const result = await User.findOne({
        username: user.username
    });
    if (result.username == user.username && result.password == user.password) {
        var payload = _.pick(result, ['username', 'password', 'userType', 'email']);
        // jwt.sign(payload, 'addjsonwebtokensecretherelikeQuiscustodietipsoscustodes', { algorithm: 'RS256'}, function (err, token) {
        //     console.log('token', token);
        //     console.log('error', err)
        // });
        return result + user;
    } else {
        throw 'Auth failed'
    }
}


UserMethod.User = User;
module.exports = UserMethod;