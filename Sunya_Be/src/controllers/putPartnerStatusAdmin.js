const { Partner } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  const { id, active } = req.body; // Obtén los datos del cuerpo de la solicitud directamente

  try {
    const partner = await Partner.findByPk(id);
    
    if (!partner) {
      return res.status(404).json({ message: 'Tienda aliada no encontrada' });
    }

    partner.active = active;

    await partner.save();

    return response(res, 200, { message: 'Tienda aliada actualizada' });
  } catch (error) {
    // Manejo de errores
    console.error('Error al actualizar el estado de la tienda aliada:', error);
    return res
      .status(500)
      .json({
        message: 'Error del servidor al actualizar el estado de la tienda aliada',
      });
  }
};
