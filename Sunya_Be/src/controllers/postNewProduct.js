const { Product } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  const product = req.body;
  const accountGroupNumber = parseInt(product.account);
  const stockControl = JSON.parse(product.stockControl)
  const taxIncluded = JSON.parse(product.taxIncluded)
  const taxConsumptionValue = parseInt(product.taxConsumptionValue);
  const idNumber = parseInt(product.idTax);
  const positionNumber = parseInt(product.position);

  await Product.create({
    name: product.name,
    slug: product.slug,
    account_group: accountGroupNumber,
    type: product.type,
    stock_control: stockControl,
    tax_classification: product.taxClassification,
    tax_included: taxIncluded,
    tax_consumption_value: taxConsumptionValue, 
    id_taxes: idNumber,
    currency_code: product.currencyCode,
    price_list_position: positionNumber,
    unit: product.unid,
    image: product.image,
    brand: product.brand,
    description: product.description,
    price: product.price,
    countInStock: product.countInStock,
    code: product.code
  });
  response(res, 201, 'success');
};
