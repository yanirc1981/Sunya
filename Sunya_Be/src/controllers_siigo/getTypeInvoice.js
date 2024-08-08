const axios = require('axios');
const getAccessToken = require('./getAccessToken');
const response = require('../utils/response');
const { PARTNER_ID } = require('../config/envs');

module.exports = async (req, res) => {
  try {
    // Obtener el token de acceso
    const accessToken = await getAccessToken();

    // Realizar la solicitud a la API
    // const response = await axios.get('https://api.siigo.com/v1/document-types?type=FV', {
    //     headers: {
    //    'Content-Type': 'application/json',
    //    'Authorization': `Bearer ${accessToken}`,
    //    'Partner-Id': 'NombreDeTuAplicacion'
    // },
    //  httpsAgent: agent
    // });

    // Realizar la solicitud a la API
    const invoicesResponse = await axios.get(
      'https://private-anon-7732e33c83-siigoapi.apiary-proxy.com/v1/document-types?type=FV',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Partner-Id': PARTNER_ID,
        },
      }
    );

    const invoicesData = invoicesResponse.data;

    
    return response(res, 201, invoicesData);
  } catch (error) {
    console.error(
      'Error al enviar los datos a la API:',
      error.message || error
    );
    return res
      .status(500)
      .json({
        error: 'No se pudo obtener la información de los tipos de factura.',
      });
  }
};
