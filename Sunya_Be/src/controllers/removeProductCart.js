const { CartItem, Product } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const { productId, id } = req.query;

    // Encontrar el CartItem correspondiente al producto y usuario
    let existingCartItem = await CartItem.findOne({
      where: {
        id_user: id,
        id_product: productId,
      },
    });

    // Si el CartItem existe, actualizar la cantidad
    if (existingCartItem) {
      // Actualizar la cantidad restando uno
      await existingCartItem.update({ quantity: existingCartItem.quantity - 1 });

      // Obtener el producto correspondiente
      const product = await Product.findByPk(productId);
      if (product) {
        // Incrementar el countInStock del producto en uno
        await product.increment('countInStock');
      } else {
        // Si el producto no existe, manejar el error
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // Responder con éxito
      return response(res, 200, 'Producto restado del carrito exitosamente');
    } else {
      // Si el CartItem no existe, manejar el error
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }
  } catch (error) {
    console.error('Error al restar producto del carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
