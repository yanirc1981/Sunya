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

    // Datos a enviar a la API
    const { id } = req.params;
    const newData = req.body;

    // Modificar los datos al formato requerido por la API
    const data = {
      code: newData.code,
      name: newData.name,
      account_group: newData.account_group,
      type: newData.type,
      stock_control: newData.stock_control,
      active: newData.active,
      tax_classification: newData.tax_classification,
      tax_included: newData.tax_included,
      tax_consumption_value: newData.tax_consumption_value,
      taxes: [
        {
          id: newData.id,
          milliliters: newData.milliliters,
          rate: newData.rate,
        },
      ],
      prices: [
        {
          currency_code: newData.currency_code,
          price_list: [
            {
              position: newData.position,
              value: newData.value,
            },
          ],
        },
      ],
      unit: newData.unit,
      unit_label: newData.unit_label,
      reference: newData.reference,
      description: newData.description,
      additional_fields: {
        barcode: newData.barcode,
        brand: newData.brand,
        tariff: newData.tariff,
        model: newData.model,
      },
    };
    console.log(data);
    //Realizar la solicitud a la API con los datos modificados
    // const response = await axios.put(`https://api.siigo.com/v1/customers/${id}`, data, {
   //     headers: {
    //    'Content-Type': 'application/json',
    //    'Authorization': `Bearer ${accessToken}`,
    //    'Partner-Id': 'NombreDeTuAplicacion'
    // },
    //  httpsAgent: agent
    // });

    return response(res, 201, 'Cliente actualizado correctamente'); // Devolver la respuesta de la API
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

// const updateCustomer = async (req, res) => {
//     const { id } = req.params; // Obtener el ID de los parámetros de la URL
//     const newData = req.body; // Obtener los nuevos datos del cuerpo de la solicitud

//     try {
//       const url = `https://api.siigo.com/v1/customers/${id}`; // Concatenar el ID a la URL
//       const accessToken = '[tu-token-de-autenticación]'; // Token de autenticación necesario para la API externa

//       var request = new XMLHttpRequest();
//       request.open('PUT', url);
//       request.setRequestHeader('Content-Type', 'application/json');
//       request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
//       request.setRequestHeader('Partner-Id', 'NombreDeTuAplicacion');

//       request.onreadystatechange = function () {
//         if (this.readyState === 4) {
//           console.log('Status:', this.status);
//           console.log('Headers:', this.getAllResponseHeaders());
//           console.log('Body:', this.responseText);
//           // Puedes enviar la respuesta al cliente o manejarla como desees
//           res.json({ status: this.status, body: this.responseText });
//         }
//       };

//       request.send(JSON.stringify(newData)); // Enviar los nuevos datos en el cuerpo de la solicitud
//     } catch (error) {
//       // Si ocurre un error, devuelve un mensaje de error al cliente
//       res.status(500).json({ error: error.message });
//     }
//   };

//   module.exports = { updateCustomer };
