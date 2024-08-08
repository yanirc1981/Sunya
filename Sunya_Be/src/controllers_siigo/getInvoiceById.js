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
    // const response = await axios.get(`https://private-anon-660fb2e137-siigoapi.apiary-mock.com/v1/invoices/${id}`, {
    //     headers: {
    //    'Content-Type': 'application/json',
    //    'Authorization': `Bearer ${accessToken}`,
    //    'Partner-Id': 'NombreDeTuAplicacion'
    // },
    //  httpsAgent: agent
    // });

    const invoice = {
      id: '63f918c2-ca65-4edc-a7db-66bcdd5159fb',
      document: {
        id: 24446,
      },
      number: 22,
      name: 'FV-2-22',
      date: '2015-12-15',
      customer: {
        id: '6b6ceb28-b2eb-4b98-b3dd-26648a933c81',
        identification: '13832081',
        branch_office: 0,
      },
      cost_center: 235,
      currency: {
        code: 'USD',
        exchange_rate: 3825.03,
      },
      total: 2546.05,
      balance: 0,
      seller: 629,
      observations: 'Observaciones',
      items: [
        {
          id: '63f918c2-ca65-4edc-a7db-66bcdd5159ps',
          code: 'Item-1',
          description: 'Camiseta de algodón',
          quantity: 2,
          price: 1069.77,
          discount: {
            percentage: 13,
            value: 130,
          },
          taxes: [
            {
              id: 13156,
              name: 'IVA 19%',
              type: 'IVA',
              percentage: 19,
              value: 406.51,
            },
          ],
          total: 2546.05,
        },
      ],
      payments: [
        {
          id: 5636,
          name: 'Crédito',
          value: 1273.03,
          due_date: '2021-03-19',
        },
      ],
      global_discounts: [
        {
          id: 13156,
          name: 'Descuento porcentual',
          percentage: 10,
          value: 100,
        },
      ],
      additional_fields: {},
      metadata: {
        created: '2020-06-15T03:33:17.208Z',
        last_updated: 'null',
      },
    };
    return response(res, 201, invoice); // Devolver la respuesta de la API
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
