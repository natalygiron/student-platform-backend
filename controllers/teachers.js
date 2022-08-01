const { response } = require('express');

const Teacher = require('../models/teacher');

const getTeachers = async (req, res) => {

    try {
        const teachers = await Teacher.find()
                                    .populate('user','email')

        
        res.json({
            ok: true,
            teachers
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.' + error  
        });
    }
}

const createTeacher = async ( req, res = response) => {

    const uid = req.uid;
    // const cid = req.body.course;
    
    try {
        const teacher = new Teacher({
            user: uid,
            // course: cid,
            ...req.body
        })
        
        const newTeacher = await teacher.save();

        res.json({
            ok: true,
            newTeacher
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }
}

const updateTeacher = async ( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;
    
    try {

        const teacher = await Teacher.findById(id);

        if(!teacher) {
            return res.status(404).json({
                ok:true,
                msg: 'No teacher found with that id.'
            })
        }

        const teacherChanges = {
            ...req.body,
            usuario: uid,
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacherChanges, {new: true})
        
        res.json({
            ok:true,
            teacher: updatedTeacher
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }

}

const deleteTeacher = async ( req, res = response ) => {
    const id = req.params.id;

    try {

        const teacher = await Teacher.findById(id);

        if(!teacher){
            return res.status(404).json({
                ok: true,
                msg: 'No teacher found with that id.'
            })
        }

        await Teacher.findByIdAndDelete(id);

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
    getTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher
}