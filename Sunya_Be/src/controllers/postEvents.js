const { Order, Customer, User } = require('../data');
const crypto = require('crypto');
const response = require('../utils/response');
const { EVENTS_SECRET_KEY } = require('../config/envs');

module.exports = async (req, res) => {
  const { event, data, signature, timestamp } = req.body;

  const WompiSecret = EVENTS_SECRET_KEY;
  // Paso 1: Concatenar los valores de las propiedades
  const properties = signature.properties
    .map((prop) => {
      return prop.split('.').reduce((o, i) => o[i], data);
    })
    .join('');

  // Paso 2: Concatenar el timestamp
  const concatenatedString = properties + timestamp;

  // Paso 3: Concatenar tu secreto
  const stringToHash = concatenatedString + WompiSecret;

  // Paso 4: Generar el checksum usando SHA256
  const generatedChecksum = crypto
    .createHash('sha256')
    .update(stringToHash)
    .digest('hex');

  // Paso 5: Comparar el checksum generado con el proporcionado por Wompi
  if (generatedChecksum !== signature.checksum) {
    return res.status(400).send('Invalid checksum');
  }

  //obtener el id de la orden

  const addressLine2 = data.transaction.shipping_address.address_line_2;
  const regex = /Oficina (\d+)/;
  const match = addressLine2.match(regex);
  let orderId = null;

  if (match && match[1]) {
    orderId = parseInt(match[1], 10);
  } else {
    console.error(
      'No se encontró un número después de "Oficina" en address_line_2'
    );
  }

  // Procesar el evento
  if (event === 'transaction.updated') {
    try {
      // Buscar la orden por ID
      const order = await Order.findOne({ where: { id: orderId } });
      
      if (order) {
       
        const shippingAddress = order.shippingAddress;
        let customer = null;

        if (shippingAddress.idUser) {
          // Buscar el usuario por ID, este cuando el usuario de la pagina, realizo una compra
          const user = await User.findOne({
            where: { id: shippingAddress.idUser },
          });
          
          if (user) {
            const customerTable = await Customer.findOne({
              where: { identification: user.n_document },
            });
            
            if (!customerTable) {
              // Crear el cliente con la información del usuario, ya pasa de usuario a cliente
              customer = await Customer.create({
                identification: user.n_document,
                first_name: user.first_name,
                last_name: user.last_name,
                nameCompany: user.nameCompany,
                commercialName: user.commercialName,
                person_type: user.person_type,
                id_type: user.id_type,
                address: shippingAddress.address,
                state_code: user.state_code,
                city_code: user.city_code,
                number: user.phone,
                first_name_contact: user.first_name,
                last_name_contact: user.last_name,
                email_contact: user.email,
                phone_contact: user.phone,
              });
            } else {
              customer = customerTable; // Usar el cliente existente
            }
          } else {
            return res.status(404).send('User not found');
          }
        } else {
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
        }

        order.paymentResult = data;
        order.paidAt = data.transaction.finalized_at;
        order.isPaid = true;
        // Relacionar la orden con el cliente
        order.id_customer = customer.id;
        await order.save();
      } else {
        return res.status(404).send('Order not found');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      return res.status(500).send('Internal Server Error');
    }
  }

  return response(res, 200, 'success');
};
