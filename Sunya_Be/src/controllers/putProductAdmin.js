
const { Product } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const { id, ...productData } = req.body;
    const productToUpdate = await Product.findOne({ where: { id } });
    if (!productToUpdate) {
      return response(res, 404, { message: 'Producto no encontrado' });
    }
    const updatedFields = {};
    for (const key in productData) {
      if (productData.hasOwnProperty(key)) {
        
        if (productData[key] !== '') {
          updatedFields[key] = productData[key];
        }
      }
    }
   
    if (Object.keys(updatedFields).length === 0) {
      return response(res, 400, {
        message: 'No se proporcionaron datos para actualizar',
      });
    }

    
    await Product.update(updatedFields, { where: { id } });
    return response(res, 200, { message: 'Producto actualizado' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return response(res, 500, { message: 'Error interno del servidor' });
  }
};
