const { CartItem, Product } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const { productId, quantity, id } = req.query;

    // Verificar si ya existe una entrada para el usuario y el producto
    let existingCartItem = await CartItem.findOne({
      where: {
        id_user: id,
        id_product: productId,
      },
    });

    if (existingCartItem) {
      // Si ya existe una entrada, actualizar la cantidad
      await existingCartItem.update({ quantity: parseInt(quantity) });
    } else {
      // Si no existe una entrada, crear una nueva
      await CartItem.create({
        id_user: id,
        id_product: productId,
        quantity: parseInt(quantity),
      });
    }

    // Restar uno a la propiedad countInStock del producto
    const product = await Product.findByPk(productId);
    if (product) {
      await product.update({ countInStock: product.countInStock - 1 });
    } else {
      // Si el producto no existe, manejar el error
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    response(res, 201, 'Producto agregado al carrito exitosamente');
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
