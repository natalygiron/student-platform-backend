// Route /api/users

const {Router} = require('express');
const { body } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post('/', [
        body('firstname', 'This field is required').not().isEmpty(),
        body('lastname', 'This field is required').not().isEmpty(),
        body('password', 'The field password is required').not().isEmpty(),
        body('email', 'The field email is required').isEmail(),
        validateFields
    ],
    createUser
);

router.put('/:id', [
        validateJWT,
        body('firstname', 'The field firstname is required').not().isEmpty(),
        body('lastname', 'The field lastname is required').not().isEmpty(),
        body('role', 'The field role is required').not().isEmpty(),
        body('email', 'The field email is required').isEmail(),
        validateFields
    ], 
    updateUser
);

router.delete('/:id', [
        validateJWT
    ],
    deleteUser
);


module.exports = router;