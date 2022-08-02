// Route /api/teachers

const {Router} = require('express');
const { body } = require('express-validator');

const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getCategories);

router.get('/:id', validateJWT, getCategoryById);

router.post('/', [
        validateJWT,
        body('name', 'This field is required').not().isEmpty(),
        body('description', 'This field is required').not().isEmpty(),
        validateFields
    ],
    createCategory
)
    
router.put('/:id', [
        validateJWT,
        body('name', 'This field is required').not().isEmpty(),
        body('description', 'This field is required').not().isEmpty(),
    ],
    updateCategory
)

router.delete('/:id', 
    validateJWT,
    deleteCategory
)

module.exports = router;