const { Product } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const productId = req.params.id_product;
    
    const product = await Product.findByPk(productId);

    if (!product) {
      return response(res, 404, { error: 'Producto no encontrado' });
    }

    return response(res, 200, product);
  } catch (error) {
    console.error('Error al buscar el producto:', error);
    return response(res, 500, { error: 'Ocurrió un error al buscar el producto' });
  }
};
