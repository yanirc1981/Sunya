const { Order } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const orderId = req.params.id_order;
    
    const order = await Order.findByPk(orderId);

    if (!order) {
      return response(res, 404, { error: 'Pedido no encontrado' });
    }

    return response(res, 200, order);
  } catch (error) {
    console.error('Error al buscar el pedido:', error);
    return response(res, 500, { error: 'Ocurrió un error al buscar el pedido' });
  }
};
