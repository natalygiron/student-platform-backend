const { response } = require('express');

const User = require('../models/user');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Course = require('../models/course');

const getSearch = async ( req, res = response ) => {
    const search = req.params.search;
    
    // TODO: Add validation for param search
    // if(!search) {
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Please enter a term to search' 
    //     });
    // }

    const regex = new RegExp( search, 'i' );
    
    try {
        const [ users, students, teachers ] = await Promise.all([

            User.find({
                "$or":[
                    {firstname: regex},
                    {lastname: regex}
                ]
            }),
            Student.find({
                "$or":[
                    {firstname: regex},
                    {lastname: regex}
                ]
            }),
            Teacher.find({
                "$or":[
                    {firstname: regex},
                    {lastname: regex}
                ]
            }),
           
        ])
    
        res.json({
            ok : true,
            users,
            students,
            teachers
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.' + error 
        });
    }

    

}

const getDocumentFromCollection = async ( req, res = response ) => {

    const table = req.params.table;
    const search = req.params.search;
    // const newSearch = _.deburr(search); //use lodash

    const regex = new RegExp( search, 'i');
    let data = []

    switch (table) {
        case 'students':
            data = await Student.find({ "$or":[
                {firstname: regex},
                {lastname: regex}
            ]})
                .populate('course','name')

            break;
        case 'courses':
            data = await Course.find({ name: regex })
                                .populate('student','firstname')

            break;
        case 'users':
            data = await User.find({ "$or":[
                {firstname: regex},
                {lastname: regex}
            ]})

            break;
        case 'teachers':
            data = await Teacher.find(
                // {    $text:{
                //         $search: regex,
                //         $caseSensitive: false,
                //         $diacriticSensitive: false
                //     }
                // }
                { "$or":[
                    {firstname: regex},
                    {lastname: regex}
                ]}
            )
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