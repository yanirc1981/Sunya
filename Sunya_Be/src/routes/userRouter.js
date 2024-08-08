const Router = require('express');
const controllers = require('../controllers');
const isAuth = require('../utils/isAuth');


const router = Router();

router.put('/edit', isAuth, controllers.putUserAdmin);
//router.post("/review", isAuth, controllers.createReview)
//router.get("/reviews", controllers.getReviewsUsers)


module.exports = router;