const { Order, User } = require('../data'); // Importa tus modelos
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const orders = await Order.findAll({
      where: {
        id_user: userId,
      },
    });
    
    response(res, 201, orders);
  } catch (error) {
    console.error('Error al obtener órdenes para usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
