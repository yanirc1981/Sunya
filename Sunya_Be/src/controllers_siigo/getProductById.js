const axios = require('axios');
const https = require('https');
const getAccessToken = require('./getAccessToken');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    // Obtener el token de acceso
    //const accessToken = await getAccessToken();

    // Crear un agente HTTPS que use TLS 1.2
    // const agent = new https.Agent({
    //   secureProtocol: 'TLSv1_2_method'
    // });

    const { id } = req.params;
    // Realizar la solicitud a la API
    // const response = await axios.get(`https://api.siigo.com/v1/products/${id}`, {
    //     headers: {
    //    'Content-Type': 'application/json',
    //    'Authorization': `Bearer ${accessToken}`,
    //    'Partner-Id': 'NombreDeTuAplicacion'
    // },
    //  httpsAgent: agent
    // });

    const product = {
      id: '00584089-4ebc-49de-bf75-6a6cc968a96d',
      code: 'Item-1',
      name: 'Camiseta de algodón',
      account_group: {
        id: 1253,
        name: 'Productos',
      },
      type: 'Product',
      stock_control: false,
      active: true,
      tax_classification: 'Taxed',
      tax_included: false,
      tax_consumption_value: 0,
      taxes: [
        {
          id: 13156,
          name: 'IVA 19%',
          type: 'IVA',
          percentage: 19,
        },
      ],
      prices: [
        {
          currency_code: 'COP',
          price_list: [
            {
              position: 1,
              name: 'Precio de venta 1',
              value: 12000,
            },
          ],
        },
      ],
      unit: {
        code: '94',
        name: 'unidad',
      },
      unit_label: 'unidad',
      reference: 'REF1',
      description: 'Camiseta de algodón blanca',
      additional_fields: {
        barcode: 'B0123',
        brand: 'Gef',
        tariff: '151612',
        model: 'Loiry',
      },
      available_quantity: 0,
      warehouses: [
        {
          id: 1270,
          name: 'Bodega principal',
          quantity: 1,
        },
      ],
      metadata: {
        created: '2020-06-15T03:33:17.208Z',
        last_updated: 'null',
      },
    };
    return response(res, 201, product); // Devolver la respuesta de la API
  } catch (error) {
    if (error.response) {
      // Si hay una respuesta de error de la API de Siigo
      const { status, data } = error.response;
      const { Errors } = data;
      const siigoErrors = Errors.map((err) => ({
        code: err.Code,
        message: err.Message,
        params: err.Params,
        detail: err.Detail,
      }));

      console.error('Error al enviar los datos a la API:', siigoErrors);
      return res.status(status).json({ errors: siigoErrors });
    } else {
      // Si el error no tiene una respuesta de la API de Siigo
      console.error('Error al enviar los datos a la API:', error.message);
      return res
        .status(500)
        .json({ error: 'No se pudo enviar los datos a la API' });
    }
  }
};
