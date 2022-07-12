const {Schema , model} = require('mongoose');

const UserSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        required: true
    },
})

module.exports = model('User', UserSchema);