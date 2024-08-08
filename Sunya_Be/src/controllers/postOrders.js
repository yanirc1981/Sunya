const { Order, User } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentId,
      itemsPrice,
      // shippingPrice,
      taxPrice,
      totalPrice,

    } = req.body;

    
    try {
      const newOrder = await Order.create({
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentId,
        itemsPrice,
        // shippingPrice,
        taxPrice,
        totalPrice,
        id_user: req.user.id
      });

      return response(res, 201, newOrder) 
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el pedido', error });
    }
  }