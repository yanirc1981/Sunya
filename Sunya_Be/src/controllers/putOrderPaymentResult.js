const { Order, Customer } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  const { id, data } = req.body;

  

  try {
    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (!data || !data.date) {
        return res.status(400).json({ message: 'Invalid data: date is required' });
      }

    if(order) {
      const shippingAddress = order.shippingAddress;
      let customer = null;
      const customerTable = await Customer.findOne({
        where: { identification: shippingAddress.identification },
      });
      if (!customerTable) {
        // Crear el cliente con la información de shippingAddress cuando se crea la orden por administrador o cajero
        customer = await Customer.create({
          identification: shippingAddress.identification,
          id_siigo: shippingAddress.id_siigo,
          first_name: shippingAddress.first_name,
          last_name: shippingAddress.last_name,
          nameCompany: shippingAddress.nameCompany,
          commercialName: shippingAddress.nameCommercial,
          person_type: shippingAddress.person_type,
          id_type: shippingAddress.id_type,
          check_digit: shippingAddress.checkDigit,
          fiscal_responsibilities_code:
            shippingAddress.fiscal_responsibilities,
          address: shippingAddress.address,
          country_code: shippingAddress.country_code,
          state_code: shippingAddress.state_code,
          city_code: shippingAddress.city_code,
          postal_code: shippingAddress.postal_code,
          indicative: shippingAddress.indicative,
          number: shippingAddress.phone,
          extension: shippingAddress.extension,
          first_name_contact: shippingAddress.firstnameContact,
          last_name_contact: shippingAddress.lastnameContact,
          email_contact: shippingAddress.emailContact,
          indicative_contact: shippingAddress.indicativeContact,
          phone_contact: shippingAddress.phoneContact,
          extension_contact: shippingAddress.extensionContact,
          seller_id: shippingAddress.seller_id,
          collector_id: shippingAddress.collector_id,
        });
      } else {
        customer = customerTable; // Usar el cliente existente
      }
      order.id_customer = customer.id;
      order.paymentResult = data;
      order.paidAt = data.date;
      order.isPaid = true;
  
      await order.save();
    }
   

    response(res, 201, 'success');
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
