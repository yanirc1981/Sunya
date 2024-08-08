const axios = require('axios');
const response = require('../utils/response');
const getAccessToken = require('./getAccessToken');
const { PARTNER_ID } = require('../config/envs');


module.exports = async (req, res) => {
  try {
    //Obtener el token de acceso
    const accessToken = await getAccessToken();

    

    // Datos a enviar a la API
    const originalData = req.body;

    console.log(originalData)
    const accountGroupNumber = parseInt(originalData.account);
    const taxConsumptionValue = parseInt(originalData.taxConsumptionValue);
    const idNumber = parseInt(originalData.idTax);
    const positionNumber = parseInt(originalData.position);
    const valueNumber = parseInt(originalData.price);
    const stockControl = JSON.parse(originalData.stockControl)
    const taxIncluded = JSON.parse(originalData.taxIncluded)
    
    const data = {
      code: originalData.code,
      name: originalData.name,
      account_group: accountGroupNumber,
      type: originalData.type || 'Product',
      stock_control: stockControl || false,
      active: originalData.active || true,
      tax_classification: originalData.tax_classification || 'Taxed',
      tax_included: taxIncluded || false,
      tax_consumption_value: taxConsumptionValue || 0,
      taxes: [
        {
          id: idNumber,
          milliliters: originalData.milliliters || '',
          rate: originalData.rate || '',
        },
      ],
      prices: [
        {
          currency_code: originalData.currencyCode || 'COP',
          price_list: [
            {
              position: positionNumber,
              value: valueNumber,
            },
          ],
        },
      ],
      unit: originalData.unit,
      unit_label: originalData.unit_label || 'unidad',
      reference: originalData.reference || '',
      description: originalData.description || '',
      additional_fields: {
        barcode: originalData.barcode || '',
        brand: originalData.brand || '',
        tariff: originalData.tariff || '',
        model: originalData.model || '',
      },
    };

    //Realizar la solicitud a la API con el token de acceso en la cabecera de autorización
    // const response = await axios.post(
    //   'https://api.siigo.com/v1/products',
    //   data,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${accessToken}`,
    //       'Partner-Id': PARTNER_ID,
    //     },
    //   }
    // );

    // direccion de prueba
    const newProduct = await axios.post(
      'https://private-anon-e40583f2a6-siigoapi.apiary-proxy.com/v1/products',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'Partner-Id': PARTNER_ID,
        },
      }
    );

    const productData = newProduct.data;

    return response(res, 201, productData); // Devolver la respuesta de la API
  } catch (error) {
    console.error('Error al enviar los datos a la API:', error);
  }
};
