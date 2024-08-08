const axios = require('axios');
const getAccessToken = require('./getAccessToken');
const response = require('../utils/response');
const { PARTNER_ID } = require('../config/envs');

module.exports = async (req, res) => {
  try {
    // Obtener el token de acceso
    const accessToken = await getAccessToken();

    // Realizar la solicitud a la API
    const costCentersResponse = await axios.get(
      'https://private-anon-7732e33c83-siigoapi.apiary-proxy.com/v1/cost-centers',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Partner-Id': PARTNER_ID,
        },
      }
    );

    const costCentersData = costCentersResponse.data;

    return response(res, 200, costCentersData);
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
