const Router = require('express');
const controllers = require('../controllers');
const isAuth = require('../utils/isAuth');
const isAdmin = require('../utils/isAdmin');

const router = Router();
router.get('/users', isAuth, isAdmin, controllers.getUsersAdmin);
router.get('/customers', isAuth, isAdmin, controllers.getCustomersAdmin);
router.put('/user', isAuth, isAdmin, controllers.putUserAdmin);
router.get('/orders', isAuth, isAdmin, controllers.getUsersAdminOrders);
router.put('/product', isAuth, isAdmin, controllers.putProductAdmin);
router.put(
  '/product/status',
  isAuth,
  isAdmin,
  controllers.putProductStatusAdmin
);
router.get('/products', isAuth, isAdmin, controllers.getProductsAdmin);
router.post('/products', isAuth, isAdmin, controllers.postNewProduct);
router.post('/assign_stock', isAuth, isAdmin, controllers.postAssignStockStore);
router.post(
  '/assign_casher',
  isAuth,
  isAdmin,
  controllers.postAssignCasherStore
);
router.get('/partners', isAuth, isAdmin, controllers.getPartnersAdmin);
router.put(
  '/partner/status',
  isAuth,
  isAdmin,
  controllers.putPartnerStatusAdmin
);
router.put('/partner', isAuth, isAdmin, controllers.putPartnerAdmin);
router.post('/partners', isAuth, isAdmin, controllers.postNewPartner);

module.exports = router;
