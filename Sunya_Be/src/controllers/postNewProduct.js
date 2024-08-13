const { Product } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const product = req.body;
    
    if (!product.name || !product.slug || !product.description || !product.price || !product.countInStock || !product.code) {
      return response(res, 400, 'Faltan campos obligatorios');
    }
    
    const accountGroupNumber = parseInt(product.account, 10);
    const stockControl = JSON.parse(product.stockControl || 'false');
    const taxIncluded = JSON.parse(product.taxIncluded || 'false');
    const taxConsumptionValue = parseInt(product.taxConsumptionValue || '0', 10);
    const idNumber = parseInt(product.idTax, 10);
    const positionNumber = parseInt(product.position, 10);
    const images = Array.isArray(product.images) ? product.images : JSON.parse(product.images || '[]');
    
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
      image:product.image,
      images: product.images || [], 
      brand: product.brand,
      description: product.description,
      price: parseFloat(product.price),
      countInStock: parseFloat(product.countInStock),
      code: product.code
    });
    
    response(res, 201, 'success');
  } catch (error) {
    console.error('Error creating product:', error);
    response(res, 500, 'Error creating product');
  }
};

