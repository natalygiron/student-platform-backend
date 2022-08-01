const {Schema , model} = require('mongoose');

const StudentSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    status: {
        type: String,
        default: 'Active',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
})

StudentSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Student', StudentSchema);