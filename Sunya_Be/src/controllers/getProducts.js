const { Product } = require('../data');

const response = require('../utils/response');

module.exports = async (req, res) => {
    const products = await Product.findAll({
        where: {
          active: true,
        },
      });
  
      if (products.length === 0) {
        return response(res, 404, { message: 'No se encontraron productos activos.' });
      }
  
      return response(res, 200, products );
};
 