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
    img:{
        type: String,
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        required: true
    },
})

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object
})

module.exports = model('User', UserSchema);