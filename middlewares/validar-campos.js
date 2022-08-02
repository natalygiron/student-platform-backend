const {response} = require('express')
const { param, validationResult  } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateFields = (req, res = response, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

const validateParams = [
    param('search')
    .exists()
    .not().isEmpty()
    ,( req , res = response, next) => {
        // if(!validationResult(req).isEmpty()){
        //     res.status(422).end();
        //     return;
        // }
        // next()
        validateResult( req, res, next)
    }
] 

module.exports = {
    validateFields,
    validateParams
}