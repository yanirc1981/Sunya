const { CartItem, Product } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const { productId, id } = req.query;

    
    const existingCartItem = await CartItem.findOne({
      where: {
        id_user: id,
        id_product: productId,
      },
    });

    if (!existingCartItem) {
      return res.status(404).json({ error: 'Entrada de carrito no encontrada' });
    }

    
    const quantityToDelete = existingCartItem.quantity;

    
    await existingCartItem.destroy();

    
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    
    await product.update({ countInStock: product.countInStock + quantityToDelete });

    response(res, 200, 'Producto eliminado del carrito exitosamente');
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
