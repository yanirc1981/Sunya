const Router = require('express');
const controllers = require('../controllers');
const isAuth = require("../utils/isAuth");

const router = Router();
router.post('/', isAuth, controllers.addProductsCart);
router.delete("/", isAuth, controllers.removeProductCart)
router.delete("/delete", isAuth, controllers.deleteProductCart)
router.delete("/cart", isAuth, controllers.destroyCartItemsForUser)
router.get("/:id", isAuth, controllers.getCartItems)


module.exports = router;
