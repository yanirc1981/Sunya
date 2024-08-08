const { Router } = require('express');

const router = Router();

router.use('/auth', require('./authRouter'));
router.use('/product', require('./productRouter'));
router.use('/cart', require('./cartRouter'));
router.use('/order', require('./orderRouter'));
router.use('/admin', require('./adminRouter'));
router.use('/store', require('./storeRouter'));
router.use('/wompy', require('./wompyRouter'));
router.use('/partner', require('./partnerRouter'));
router.use('/siigo', require('./siigoRouter'));

module.exports = router;
