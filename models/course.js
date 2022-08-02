const {Schema , model} = require('mongoose');

const CourseSchema = Schema({
    name: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    student: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
})

CourseSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Course', CourseSchema);