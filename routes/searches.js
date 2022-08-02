// Route /api/todo

const {Router} = require('express');

const { getSearch, getDocumentFromCollection } = require('../controllers/searches');
// const { validateParams } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get("/:search", validateJWT, getSearch);

router.get("/collection/:table/:search", validateJWT, getDocumentFromCollection);


module.exports = router;