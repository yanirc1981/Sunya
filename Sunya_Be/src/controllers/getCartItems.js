const { CartItem, Product } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Obtener todos los elementos del carrito para el usuario especificado
      const cartItems = await CartItem.findAll({
        where: {
          id_user: id
        },
        include: [Product] // Incluir información del producto
      });
      response(res, 201, cartItems)
    } catch (error) {
      console.error('Error al obtener el carrito del usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };    
  