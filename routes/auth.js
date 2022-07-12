const { Router } =require('express');
const { body } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
        body('email', 'The field email is required.').isEmail(),
        body('password', 'You must enter your password.').not().isEmpty(),
        validateFields
    ],
    login
);

module.exports = router;