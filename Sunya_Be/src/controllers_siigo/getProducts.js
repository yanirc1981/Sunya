const axios = require('axios');
const getAccessToken = require('./getAccessToken');
const response = require('../utils/response');
const { PARTNER_ID } = require('../config/envs');

module.exports = async (req, res) => {
  try {
    // Obtener el token de acceso
    const accessToken = await getAccessToken();

    // Realizar la solicitud a la API
    // const response = await axios.get('https://api.siigo.com/v1/products', {
    //     headers: {
    //    'Content-Type': 'application/json',
    //    'Authorization': `Bearer ${accessToken}`,
    //    'Partner-Id': 'NombreDeTuAplicacion'
    // },
    //
    // });

    // dirección de prueba

    const productsResponse = await axios.get(
      'https://private-anon-e40583f2a6-siigoapi.apiary-proxy.com/v1/products',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Partner-Id': PARTNER_ID,
        },
      }
    );

    const productsData = productsResponse.data.results;

    console.log(JSON.stringify(productsData, null, 2));
    return response(res, 201, productsData);
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
