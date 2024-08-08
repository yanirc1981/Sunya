const { Customer } = require('../data');

const response = require('../utils/response');

module.exports = async (req, res) => {
    const customers = await Customer.findAll();
  
      if (customers.length === 0) {
        return response(res, 404, { message: 'No se encontraron clientes.' });
      }
  
      return response(res, 200, customers );
};
