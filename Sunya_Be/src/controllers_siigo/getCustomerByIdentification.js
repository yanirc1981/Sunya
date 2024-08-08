const axios = require('axios');
const getAccessToken = require('./getAccessToken');
const response = require('../utils/response');
const { PARTNER_ID } = require('../config/envs');

module.exports = async (req, res) => {
    const { identification } = req.params;
  try {
    // Obtener el token de acceso
    const accessToken = await getAccessToken();
    
    // Realizar la solicitud a la API
    // const response = await axios.get(`https://api.siigo.com/v1/customers?=${identification}`, {
    //     headers: {
    //    'Content-Type': 'application/json',
    //    'Authorization': `Bearer ${accessToken}`,
    //    'Partner-Id': 'NombreDeTuAplicacion'
    // },
    //  
    // });

    //endPoint de prueba
    const customerResponse = await axios.get(
        `https://private-anon-bbaf453f05-siigoapi.apiary-proxy.com/v1/customers?identification=${identification}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Partner-Id': PARTNER_ID,
          },
        }
      );
   
    const customer = customerResponse.data.results[0];
    

    return response(res, 201, customer); // Devolver la respuesta de la API
} catch (error) {
    console.error('Error al enviar los datos a la API:', error.message || error);
    return res.status(500).json({ error: 'No se pudo obtener la información de usuarios.' });
}
};