const { response } = require('express');

const Student = require('../models/student');

const getStudents = async (req, res) => {

    try {
        const students = await Student.find()
                                    .populate('user','firstname')
                                    .populate('course','name');
        
        res.json({
            ok: true,
            students
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }
}

const getStudentById = async ( req, res = response ) => {
    
    const id = req.params.id;

    try {
        
        const student = await Student.findById(id)
                                        .populate('user','email')
                                        .populate('course','name');
        
        if(!student) {
            return res.status(404).json({
                ok:true,
                msg: 'No student found with that id.'
            })
        }

        res.json({
            ok: true,
            student
        });

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'An error has ocurred.' + error  
        }) 
    }
}

const createStudent = async ( req, res = response) => {

    const uid = req.uid;
    console.log(uid)
    
    try {
        const student = new Student({
            user: uid,
            ...req.body
        })
        
        const newStudent = await student.save();

        res.json({
            ok: true,
            newStudent
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.' + error  
        });
    }
}

const updateStudent = async ( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const student = await Student.findById(id);

        if(!student) {
            return res.status(404).json({
                ok:true,
                msg: 'No student was found with that id.'
            })
        }

        const studentChanges = {
            ...req.body,
            usuario: uid,
        }

        const updatedStudent = await Student.findByIdAndUpdate(id, studentChanges, {new: true})
        
        res.json({
            ok:true,
            student: updatedStudent
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }

}

const deleteStudent = async ( req, res = response ) => {
    const id = req.params.id;

    try {

        const student = await Student.findById(id);

        if(!student){
            return res.status(404).json({
                ok: true,
                msg: 'No student was found with that id.'
            })
        }

        await Student.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Deleted'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }
}

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById
}