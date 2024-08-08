const Router = require('express');
const controllers = require('../controllers');

const router = Router();
router.get('/', controllers.getPartners);

module.exports = router;
