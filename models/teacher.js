const {Schema , model} = require('mongoose');

const TeacherSchema = Schema({
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}
// ,{
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
)

TeacherSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
})

TeacherSchema.virtual("courses", {
    ref: "Course",
    localField: "_id",
    foreignField: "teacher"
});


module.exports = model('Teacher', TeacherSchema);