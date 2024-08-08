const { Product, Store, StoreProduct } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
 
    const { storeId, productStocks } = req.body;

    // Convertir storeId a número
    const storeIdNumber = parseInt(storeId, 10);
    
    try {
      // Verificar si la tienda existe
      const store = await Store.findByPk(storeIdNumber);
      console.log("estoy aca")
      if (!store) {
        return res.status(404).json({ message: 'Tienda no encontrada' });
      }
  
      for (const { productId, stock } of productStocks) {
        // Verificar si el producto existe
        const product = await Product.findByPk(productId);
        if (!product) {
          return res.status(404).json({ message: `Producto con id ${productId} no encontrado` });
        }
  
        // Crear o actualizar el stock en la tabla intermedia
        const storeProduct = await StoreProduct.findOne({ where: { storeId: storeIdNumber,  productId } });
        if (storeProduct) {
          storeProduct.stock = stock;
          await storeProduct.save();
        } else {
          await StoreProduct.create({ storeId: storeIdNumber, productId, stock });
        }
      }
  
      response(res, 201, 'success');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error asignando stock' });
    }

};
