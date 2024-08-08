const { Product } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  const { id, active } = req.body; // Obtén los datos del cuerpo de la solicitud directamente

  try {
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.active = active;

    await product.save();

    return response(res, 200, { message: 'Producto actualizado' });
  } catch (error) {
    // Manejo de errores
    console.error('Error al actualizar el estado del producto:', error);
    return res
      .status(500)
      .json({
        message: 'Error del servidor al actualizar el estado del producto',
      });
  }
};
