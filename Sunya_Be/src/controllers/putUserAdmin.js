const bcrypt = require("bcrypt");
const { User } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const { id, password, ...userData } = req.body;
    const userToUpdate = await User.findOne({ where: { id } });
    if (!userToUpdate) {
      return response(res, 404, { message: 'Usuario no encontrado' });
    }
    const updatedFields = {};
    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        // Solo agregamos al objeto de campos actualizados aquellos campos que no son vacíos
        if (userData[key] !== '') {
          updatedFields[key] = userData[key];
        }
      }
    }
    // Encriptar la nueva contraseña si se proporciona
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Aquí usamos un factor de costo de 10
      updatedFields.password = hashedPassword;
    }
    if (Object.keys(updatedFields).length === 0) {
      return response(res, 400, {
        message: 'No se proporcionaron datos para actualizar',
      });
    }

    // Actualizar los datos del usuario
    await User.update(updatedFields, { where: { id } });
    return response(res, 200, { message: 'Usuario actualizado' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return response(res, 500, { message: 'Error interno del servidor' });
  }
};
