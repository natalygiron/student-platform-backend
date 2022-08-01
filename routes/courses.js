// Route /api/teachers

const {Router} = require('express');
const { body } = require('express-validator');

const { getCourse, createCourse, updateCourse, deleteCourse, addStudentToCourse, addCourseToStudent, deleteStudentFromCourse, deleteCourseFromStudent } = require('../controllers/courses');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getCourse);

router.post('/', [
        validateJWT,
        body('name', 'This field is required').not().isEmpty(),
        validateFields
    ],
    createCourse
);

router.put('/addStudent/:id', [
    validateJWT,
    ],
    addStudentToCourse
)
router.put('/addCourse/:id', [
    validateJWT,
    ],
    addCourseToStudent
)
    
router.put('/:id', [
        validateJWT,
        body('name', 'This field is required').not().isEmpty()
    ],
    updateCourse
)

router.delete('/:id', 
    validateJWT,
    deleteCourse
)
router.delete('/fromCourse/:id', 
    validateJWT,
    deleteStudentFromCourse
)
router.delete('/fromStudent/:id', 
    validateJWT,
    deleteCourseFromStudent
)

module.exports = router;