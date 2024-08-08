const { CartItem, User } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return response(res, 404, 'Usuario no encontrado');
    }

    await CartItem.destroy({
      where: {
        id_user: userId,
      },
    });

    return response(res, 201, 'Entradas de carrito eliminadas exitosamente');
  } catch (error) {
    console.error('Error al eliminar entradas de carrito:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
