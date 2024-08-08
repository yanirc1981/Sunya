const Router = require('express');
const controllers_siigo = require('../controllers_siigo');
const isAuth = require('../utils/isAuth');
const isAdmin = require('../utils/isAdmin');

const router = Router();
router.post('/createCustomers', controllers_siigo.postCreateCustomer);
router.get('/customers', controllers_siigo.getCustomers);
router.get('/customer/:id', controllers_siigo.getCustomerById);
router.put('/customer/:id', controllers_siigo.updateCustomerSiigo);
router.get('/account-group', controllers_siigo.getAccountGroup);
router.get('/customers/:identification', controllers_siigo.getCustomerByIdentification);
router.get('/taxes', controllers_siigo.getTaxes);
router.get('/costCenters', controllers_siigo.getCostCenters);
router.post('/createProducts', isAuth, isAdmin, controllers_siigo.postCreateProduct);
router.get('/product/:id', controllers_siigo.getProductById);
router.get('/products', controllers_siigo.getProducts);
router.put('/product/:id', controllers_siigo.updateProductSiigo);
router.delete('/product/:id', controllers_siigo.deleteProductById);
router.get('/invoice/type', controllers_siigo.getTypeInvoice);
router.get('/users', controllers_siigo.getUsersSiigo);
router.get("/invoice/payments_type", controllers_siigo.getPaymentsTypeSiigo)
router.get('/invoice/:id', controllers_siigo.getInvoiceById);
router.post('/invoice', isAuth, isAdmin, controllers_siigo.postGenerateInvoiceSiigo);



module.exports = router;
