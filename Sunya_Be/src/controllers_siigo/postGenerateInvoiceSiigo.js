const { Order, Customer, User } = require('../data');
const { PARTNER_ID } = require('../config/envs');
const axios = require('axios');
const getAccessToken = require('./getAccessToken');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    // Obtener el token de acceso
    const accessToken = await getAccessToken();

    // datos necesarios
    const data = req.body;
    const idDocument = parseInt(data.invoiceType);
    const costCenter = parseInt(data.sendToCostCenters);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const orderId = data.orderId;

    // Obtener la orden y el cliente
    const order = await Order.findOne({ where: { id: orderId } });
    const value = parseInt(order.totalPrice.toFixed(2));
    const customerId = order.id_customer;
    const customer = await Customer.findOne({ where: { id: customerId } });

    // array con el nombre del cliente cuando es nuevo y no esta en siigo
    let nameArray;
    if (customer.first_name && customer.last_name) {
      nameArray = [customer.first_name, customer.last_name];
    } else {
      nameArray = [customer.nameCompany];
    }

    // Crear el array de items
    const items = order.orderItems.map((item) => {
      const product = item.Product;
      return {
        code: product.code,
        description: product.description,
        quantity: item.quantity,
        price: parseFloat(product.price),
        discount: 0,
        taxes: product.id_taxes ? [{ id: product.id_taxes }] : [],
      };
    });

    // Formatear la fecha de vencimiento
    let due_date = '';
    if (order.paymentResult.expiryDate) {
      const date = new Date(order.paymentResult.expiryDate);
      due_date = date.toISOString().split('T')[0];
    } else {
      due_date = formattedDate;
    }

    // cuerpo de la factura
    const body = {
      document: {
        id: idDocument,
      },
      date: formattedDate,
      customer: {
        person_type: customer.person_type,
        id_type: customer.id_type,
        identification: customer.identification,
        branch_office: customer.branch_office || 0,
        name: nameArray,
        address: {
          address: customer.address,
          city: {
            country_code: customer.country_code,
            state_code: customer.state_code,
            city_code: customer.city_code,
          },
        },
        phones: [
          {
            number: customer.number,
          },
        ],
        contacts: [
          {
            first_name: customer.first_name_contact || customer.first_name,
            last_name: customer.last_name_contact || customer.last_name,
            email: customer.email_contact,
            phone: {
              number: customer.phone_contact,
            },
          },
        ],
      },
      cost_center: costCenter,
      seller: data.sendToUser,
      stamp: {
        send: data.sendToDian || false,
      },
      mail: {
        send: data.sendToEmail,
      },
      observations: data.sendToCommentsInvoice || '',
      items: items,
      payments: [
        {
          id: order.paymentId,
          value: value,
          due_date: due_date,
        },
      ],
      globaldiscounts: [],
      additional_fields: {},
    };

    if (customer.id_siigo) {
      delete body.customer.person_type;
      delete body.customer.id_type;
      delete body.customer.name, delete body.customer.address;
      delete body.customer.phones;
      delete body.customer.contacts;
      delete body.cost_center;
    }

    if (idDocument == 2372) {
      delete body.currency;
      delete body.globaldiscounts;
      delete body.additional_fields;
      delete body.cost_center;
    }

   

    // Realizar la solicitud a la API
    // Ruta de producción
    // const invoiceResponse = await axios.post('https://api.siigo.com/v1/customers', body, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`,
    //     'Partner-Id': PARTNER_ID
    //   },
    // });

    // Ruta de prueba
    const invoiceResponse = await axios.post(
      'https://private-anon-57a263a973-siigoapi.apiary-proxy.com/v1/invoices',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Partner-Id': PARTNER_ID,
        },
      }
    );

    console.log(JSON.stringify(invoiceResponse.data, null, 2));

    if (invoiceResponse.data.id) {
      order.invoiceAt = invoiceResponse.data.metadata.created;
      order.idInvoice = invoiceResponse.data.id;
      order.isInvoice = true;

      // Solo actualiza el id_siigo si es diferente
      if (customer.id_siigo !== invoiceResponse.data.customer.id) {
        customer.id_siigo = invoiceResponse.data.customer.id;
        await customer.save();
      }

      await order.save();
    }

    return response(res, 201, 'ok');
  } catch (error) {
    console.error(
      'Error al enviar los datos a la API:',
      error.message || error
    );
    return res
      .status(500)
      .json({ error: 'No se pudo obtener la información de los impuestos.' });
  }
};
