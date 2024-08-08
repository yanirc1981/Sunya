const { User, Role, CartItem, Product } = require('../data');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/envs');

module.exports = async (req, res) => {
  let user = req.user;
  
  if (!user.active) {
    // Si el usuario no está activo, enviar una respuesta de error.
    res.status(401).json({ error: 'El usuario ha sido dado de baja.' });
    return;
  }

  // Cargar el modelo Role si aún no se ha cargado automáticamente
  if (!user.Role) {
    user = await user.reload({ include: Role });
  }

  

  //Crear el token JWT con los datos del usuario.
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
};
