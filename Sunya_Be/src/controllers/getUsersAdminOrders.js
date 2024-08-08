const { Order } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: [['createdAt', 'DESC']]
        });
    
        if (orders.length === 0) {
            return response(res, 404, { message: 'No se encontraron pedidos.' });
        }
    
        return response(res, 200, orders);
    } catch (error) {
        return response(res, 500, { message: 'Error al obtener los pedidos.' });
    }
};
