const { response } = require('express')
const {User} = require('../models/user');
const {Teacher} = require('../models/teacher');
const {Student} = require('../models/student');

const getSearch = async ( req, res = response ) => {

    const search = req.params.search;

    const regex = new RegExp( search, 'i' );

    const [ users, students, teachers ] = await Promise.all([
        User.find({firstname: regex, lastname: regex}),
        Student.find({firstname: regex}, 'firstname'),
        Teacher.find({firstname: regex}, 'firstname')
    ])

    res.json({
        ok: true,
        users,
        students,
        teachers
    })


}

const getDocumentFromCollection = async ( req, res = response ) => {

    const table = req.params.table;
    const search = req.params.search;

    const regex = new RegExp( search, 'i');
    let data = []

    switch (table) {
        case 'students':
            data = await Student.find({ firstname: regex, lastname: regex})
                                .populate('course','name')

            break;
        case 'courses':
            data = await Course.find({ name: regex })
                                .populate('student','firstname')

            break;
        case 'users':
            data = await User.find({ firstname: regex, lastname: regex})

            break;
        case 'teachers':
            data = await Teacher.find({ firstname: regex, lastname: regex})
                                .populate('course','name')

            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Table must be students, courses, teachers, users.'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });

}



module.exports = {
    getSearch,
    getDocumentFromCollection
}