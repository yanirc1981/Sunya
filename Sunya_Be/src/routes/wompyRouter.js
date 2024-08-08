const Router = require('express');
const controllers = require('../controllers');


const router = Router();
router.post('/events', controllers.postEvents);



module.exports = router;