const { User } = require('../data');

const response = require('../utils/response');

module.exports = async (req, res) => {
    const users = await User.findAll();
  
      if (users.length === 0) {
        return response(res, 404, { message: 'No se encontraron usuarios.' });
      }
  
      return response(res, 200, users );
};
