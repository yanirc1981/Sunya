const { Partner } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const { id, ...partnerData } = req.body;
    const partnerToUpdate = await Partner.findOne({ where: { id } });
    if (!partnerToUpdate) {
      return response(res, 404, { message: 'Tienda Aliada no encontrada' });
    }
    const updatedFields = {};
    for (const key in partnerData) {
      if (partnerData.hasOwnProperty(key)) {
        
        if (partnerData[key] !== '') {
          updatedFields[key] = partnerData[key];
        }
      }
    }
   
    if (Object.keys(updatedFields).length === 0) {
      return response(res, 400, {
        message: 'No se proporcionaron datos para actualizar',
      });
    }

    
    await Partner.update(updatedFields, { where: { id } });
    return response(res, 200, { message: 'Tienda aliada actualizada' });
  } catch (error) {
    console.error('Error al actualizar la tienda aliada:', error);
    return response(res, 500, { message: 'Error interno del servidor' });
  }
};
