const { Router } =require('express');
const { body } = require('express-validator');

const { login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router();

router.post('/', [
        body('email', 'The field email is required.').isEmail(),
        body('password', 'You must enter your password.').not().isEmpty(),
        validateFields
    ],
    login
);

router.get('/renew', [
    validateJWT,
    renewToken
]);

module.exports = router;