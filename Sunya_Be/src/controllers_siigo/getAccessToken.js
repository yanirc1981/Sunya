const { Token } = require('../data');
const axios = require('axios');
const { USERNAME, ACCESS_KEY } = require('../config/envs');

module.exports = async (req, res) => {
  try {
    const existingToken = await Token.findOne({
      order: [['createdAt', 'DESC']], // Obtener el token más reciente
    });

    if (existingToken) {
      const now = new Date();
      const tokenReceivedAt = new Date(existingToken.received_at);

      const tokenExpiryTime =
        tokenReceivedAt.getTime() + existingToken.expires_in;

      if (now.getTime() < tokenExpiryTime) {
        return existingToken.access_token;
      }
    }

    // No hay un token válido, obtener uno nuevo de la API de Siigo
    // const siigoResponse = await axios.post(
    //   'https://api.siigo.com/auth',
    //   {
    //     username: USERNAME,
    //     access_key: ACCESS_KEY,
    //   }
    // );

    const data = {
      username: 'sandbox@siigoapi.com',
      access_key: ACCESS_KEY,
    };

    // direccion de prueba
    const siigoResponse = await axios.post(
      'https://private-anon-e40583f2a6-siigoapi.apiary-proxy.com/auth',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const newToken = await Token.create({
      access_token: siigoResponse.data.access_token,
      expires_in: siigoResponse.data.expires_in,
      received_at: new Date(),
    });

    return newToken.access_token;
  } catch (error) {
    console.error('Error al enviar los datos a la API:', error);
  }
};
