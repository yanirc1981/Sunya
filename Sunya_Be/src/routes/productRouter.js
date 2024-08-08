const Router = require('express');
const controllers = require('../controllers');
const isAuth = require('../utils/isAuth');
const isAdmin = require("../utils/isAdmin")

const router = Router();
router.get('/products', controllers.getProducts);
router.get('/:id_product', controllers.getProduct);


module.exports = router;
