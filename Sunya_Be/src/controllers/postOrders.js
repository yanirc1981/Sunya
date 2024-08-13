const { Order, User } = require('../data');
const response = require('../utils/response');
const responseError= require("../utils/responseError")

module.exports = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentId,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const userRole = user.id_role;

    if (![2, 3, 4].includes(userRole)) {
      const unpaidOrdersCount = await Order.count({
        where: {
          id_user: userId,
          isPaid: false,
        },
      });


      if (unpaidOrdersCount >= 3) {
        const message=  'Comunicate con nosotros via WhatsApp'
        return responseError(res, 400, message)
      }
    }

    const newOrder = await Order.create({
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentId,
      itemsPrice,
      taxPrice,
      totalPrice,
      id_user: req.user.id,
    });

    return response(res, 201, newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido', error });
  }
};