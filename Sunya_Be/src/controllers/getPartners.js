const { Partner } = require('../data');

const response = require('../utils/response');

module.exports = async (req, res) => {
    const partners = await Partner.findAll({
        where: {
          active: true,
        },
      });
  
      if (partners.length === 0) {
        return response(res, 404, { message: 'No se encontraron productos activos.' });
      }
  
      return response(res, 200, partners );
};
 