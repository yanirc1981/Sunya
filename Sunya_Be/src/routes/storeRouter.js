const Router = require('express');
const controllers = require('../controllers');
const isAuth = require('../utils/isAuth');
const isAdmin = require("../utils/isAdmin")

const router = Router();
router.get('/stores', controllers.getStores);




module.exports = router;
