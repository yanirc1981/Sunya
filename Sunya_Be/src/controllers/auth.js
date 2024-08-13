const { User, Role, CartItem, Product } = require('../data');
const response = require('../utils/response');
const responseError = require('../utils/responseError');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/envs');

module.exports = async (req, res) => {
  let user = req.user;

  try {
    if (!user.active) {
      message = `El usuario está inactivo, para mayor información comuníquese con nosotros vía WhatsApp`;
      return responseError(res, 404, message);
    }

    if (!user.Role) {
      user = await user.reload({ include: Role });
    }
    const payload = {
      id: user.id,
      email: user.email,
      name: user.first_name,
      last: user.last_name,
      nameCompany: user.nameCompany,
      id_role: user.id_role,
      phone: user.phone,
      city_code: user.city_code,
      state_code: user.state_code,
      res_ped: user.res_ped,
    };

    const token = jwt.sign(payload, `${JWT_SECRET_KEY}`, {
      expiresIn: '1d',
    });

    response(res, 200, {
      token: token,
      user: payload,
    });
  } catch (error) {
    console.error('Error:', error);
    responseError(res, 500, 'Error interno del servidor.');
  }
};
