const { response } = require('express');
const mongoose = require("mongoose")

const Course = require('../models/course');
const Student = require('../models/student');
const Teacher = require('../models/teacher');


const getCourse = async (req, res) => {

    try {
        const course = await Course.find()
                                    // .populate('teacher', 'firstname lastname')
                                    // .populate('student', 'firstname lastname');
        
        res.json({
            ok: true,
            course
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }
}

const createCourse = async ( req, res = response) => {

    const uid = req.uid;
    const tid = req.body.teacher;
    const ctid = req.body.category; //
    
    try {
        const course = new Course({
            user: uid,
            teacher: tid,
            category: ctid,
            ...req.body
        })

        const newCourse = await course.save();
        
        const addToTeacher = await Teacher.findByIdAndUpdate( 
            {_id: tid}, 
            { $push: { courses: uid }} ,
            { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            course: newCourse,
            teacher: addToTeacher
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.' + error
        });
    }
}

const updateCourse = async ( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;
    const tid = req.body.teacher;
    const ctid = req.body.category;

    try {

        const course = await Course.findById(id);
        
        if(!course) {
            return res.status(404).json({
                ok:true,
                msg: 'No course found with that id.'
            })
        }

        const courseChanges = {
            ...req.body,
            usuario: uid,
            teacher: tid,
            category: ctid
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, courseChanges, {new: true})
        
        res.json({
            ok:true,
            course: updatedCourse,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred. ' + error   
        });
    }

}

const addStudentToCourse = async ( req, res = response) => {

    const id = req.params.id; // course id
    const sid = req.body.student;

    try {
        const getCourse = await Course.findById(id).populate("student");
        const existStudent = await getCourse.student.find(s => s = sid)
        
        if(existStudent){
            return res.status(400).json({
                ok: false,
                msg: `The student ${existStudent.firstname} ${existStudent.lastname} is already registered in this course.`
            })
        }

        const updatedCourse = await Course.findByIdAndUpdate( 
                        {_id: id}, 
                        { $push: { student: sid }} ,
                        { new: true, useFindAndModify: false });
        
        res.json({
            ok:true,
            course: updatedCourse
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred. ' + error   
        });
    }

}

const addCourseToStudent = async ( req, res = response) => {

    const id = req.params.id; // course id
    const sid = req.body.student;
    console.log(id);
    try {
        const existCourse = await Student.findOne({ course: new mongoose.Types.ObjectId(id)})

        if(existCourse){
            return res.status(400).json({
                ok: false,
                msg: `The course ${getCourse.name} has this student registered already.`
            })
        }

        const updatedStudent = await Student.updateOne( 
                        {_id: sid}, 
                        { $push: { course: id }} ,
                        { new: true, useFindAndModify: false });

        res.json({
            ok:true,
            student: updatedStudent
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred. ' + error   
        });
    }

}

const deleteStudentFromCourse = async ( req, res = response ) => {

    const id = req.params.id; // course id
    const sid = req.body.student;

    try {
       
        const updatedCourse = await Course.findByIdAndUpdate(
                        {_id: id},
                        {$pull: { student: { $gte : sid } }}, // delete elements equals to sid from the array
                        { new: true, useFindAndModify: false }
        );

        res.json({
            ok:true,
            students: updatedCourse
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred. ' + error   
        });
    }


}

const deleteCourseFromStudent = async ( req, res = response ) => {

    const id = req.params.id; // course id
    const sid = req.body.student;

    try {
       
        const updatedStudent = await Student.findByIdAndUpdate(
                        {_id: sid},
                        {$pull: { course: { $gte : id } }}, // delete elements equals to sid from the array
                        { new: true, useFindAndModify: false }
        );

        res.json({
            ok:true,
            courses: updatedStudent
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred. ' + error   
        });
    }


}



const deleteCourse = async ( req, res = response ) => {
    const id = req.params.id;

    try {

        const course = await Course.findById(id);

        if(!course){
            return res.status(404).json({
                ok: true,
                msg: 'No course found with that id.'
            })
        }

        await Course.findByIdAndDelete(id);

        res.json({
            ok: true,
            course: updatedCourse
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred.'   
        });
    }
}


module.exports = {
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addStudentToCourse,
    addCourseToStudent,
    deleteStudentFromCourse,
    deleteCourseFromStudent
}