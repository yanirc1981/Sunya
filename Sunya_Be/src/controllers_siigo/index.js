const { catchedAsync } = require('../utils');

module.exports = {
  getAccessToken: catchedAsync(require('./getAccessToken')),
  postCreateCustomer: catchedAsync(require('./postCreateCustomer')),
  getCustomers: catchedAsync(require('./getCustomers')),
  getCustomerById: catchedAsync(require('./getCustomerById')),
  getCustomerByIdentification:catchedAsync(require('./getCustomerByIdentification')),
  updateCustomerSiigo: catchedAsync(require('./updateCustomerSiigo')),
  getAccountGroup: catchedAsync(require('./getAccountGroup')),
  getTaxes: catchedAsync(require('./getTaxes')),
  getCostCenters: catchedAsync(require("./getCostCenters")),
  postCreateProduct: catchedAsync(require('./postCreateProduct')),
  getProductById: catchedAsync(require('./getProductById')),
  getProducts: catchedAsync(require('./getProducts')),
  updateProductSiigo: catchedAsync(require('./updateProductSiigo')),
  deleteProductById: catchedAsync(require('./deleteProductById')),
  getTypeInvoice: catchedAsync(require('./getTypeInvoice')),
  getUsersSiigo: catchedAsync(require('./getUsersSiigo')),
  getPaymentsTypeSiigo: catchedAsync(require('./getPaymentsTypeSiigo')),
  getInvoiceById: catchedAsync(require('./getInvoiceById')),
  postGenerateInvoiceSiigo: catchedAsync(require("../controllers_siigo/postGenerateInvoiceSiigo"))
};
