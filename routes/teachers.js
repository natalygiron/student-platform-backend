// Route /api/teachers

const {Router} = require('express');
const { body } = require('express-validator');

const { getTeachers, createTeacher, updateTeacher, deleteTeacher } = require('../controllers/teachers');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getTeachers);

router.post('/', [
        validateJWT,
        body('firstname', 'This field is required').not().isEmpty(),
        body('lastname', 'This field is required').not().isEmpty(),
        // body('course', 'This field is required').not().isEmpty(),
        validateFields
    ],
    createTeacher
)

router.put('/:id', [
        validateJWT,
        body('firstname', 'This field is required').not().isEmpty(),
        body('lastname', 'This field is required').not().isEmpty(),
        body('course', 'This field is required').not().isEmpty(),
    ],
    updateTeacher
)

router.delete('/:id', 
    validateJWT,
    deleteTeacher
)

module.exports = router;
