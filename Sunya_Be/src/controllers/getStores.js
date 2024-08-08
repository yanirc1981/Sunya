const { Store } = require('../data');

const response = require('../utils/response');

module.exports = async (req, res) => {
    const stores = await Store.findAll({
        where: {
          active: true,
        },
      });
  
      if (stores.length === 0) {
        return response(res, 404, { message: 'No se encontraron tiendas activas.' });
      }
  
      return response(res, 200, stores );
};
 