const Router = require('express');
const controllers = require('../controllers');
const isAuth = require('../utils/isAuth');

const router = Router();
router.post('/', isAuth, controllers.postOrders);
router.get('/mine', isAuth, controllers.getOrdersUser);
router.get('/:id_order', isAuth, controllers.getOrderById);
router.put('/paymentResult', isAuth, controllers.putOrderPaymentResult);
router.put('/delivery', isAuth, controllers.putOrderDelivery);


module.exports = router;
