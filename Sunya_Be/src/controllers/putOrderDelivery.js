const { Order } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  const { id, data } = req.body;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (!data || !data.date) {
      return res
        .status(400)
        .json({ message: 'Invalid data: date is required' });
    }

    order.delivery = data;
    order.deliveredAt = data.date;
    order.isDelivered = true;

    await order.save();

    response(res, 201, 'success');
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
