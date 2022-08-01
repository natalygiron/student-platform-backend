// Route /api/teachers

const {Router} = require('express');
const { body } = require('express-validator');

const { getStudents, createStudent, updateStudent, deleteStudent, getStudentById } = require('../controllers/students');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getStudents);

router.get('/:id', validateJWT, getStudentById);

router.post('/', [
        validateJWT,
        body('firstname', 'This field is required').not().isEmpty(),
        body('lastname', 'This field is required').not().isEmpty(),
        body('status', 'This field is required').not().isEmpty(),
        validateFields
    ],
    createStudent
)
    
router.put('/:id', [
        validateJWT,
        body('firstname', 'This field is required').not().isEmpty(),
        body('lastname', 'This field is required').not().isEmpty(),
        body('status', 'This field is required').not().isEmpty(),
    ],
    updateStudent
)

router.delete('/:id', 
    validateJWT,
    deleteStudent
)

module.exports = router;