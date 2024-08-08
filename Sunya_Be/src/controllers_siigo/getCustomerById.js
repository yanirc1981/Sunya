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
    // const response = await axios.get(`https://api.siigo.com/v1/customers/${id}`, {
    //     headers: {
    //    'Content-Type': 'application/json',
    //    'Authorization': `Bearer ${accessToken}`,
    //    'Partner-Id': 'NombreDeTuAplicacion'
    // },
    //  httpsAgent: agent
    // });

    const customers = [
      {
        id: '6b6ceb28-b2eb-4b98-b3dd-26648a933c81',
        type: 'Customer',
        person_type: 'Person',
        id_type: {
          code: '13',
          name: 'Cédula de ciudadanía',
        },
        identification: '13832081',
        check_digit: '4',
        name: ['Marcos', 'Castillo'],
        commercial_name: 'Siigo',
        branch_office: 0,
        active: true,
        vat_responsible: true,
        fiscal_responsibilities: [
          {
            code: 'R-99-PN',
            name: 'No responsable',
          },
        ],
        address: {
          address: 'Cra. 18 #79A - 42',
          city: {
            country_code: 'Co',
            country_name: 'Colombia',
            state_code: '19',
            state_name: 'Cauca',
            city_code: '19001',
            city_name: 'Popayán',
          },
          postal_code: '110911',
        },
        phones: [
          {
            indicative: '57',
            number: '3006003345',
            extension: '132',
          },
        ],
        contacts: [
          {
            first_name: 'Marcos',
            last_name: 'Castillo',
            email: 'marcos.castillo@contacto.com',
            phone: {
              indicative: '57',
              number: '3006003345',
              extension: '132',
            },
          },
        ],
        comments: 'Comentarios',
        related_users: {
          seller_id: 629,
          collector_id: 629,
        },
        metadata: {
          created: '2020-06-15T03:33:17.208Z',
          last_updated: 'null',
        },
      },
      {
        id: '6b6ceb28-b2eb-4b98-b3dd-26648a933c93',
        type: 'Customer',
        person_type: 'Person',
        id_type: {
          code: '13',
          name: 'Cédula de ciudadanía',
        },
        identification: '79757987',
        check_digit: '4',
        name: ['Marcos', 'Castillo'],
        commercial_name: 'Siigo',
        branch_office: 0,
        active: false,
        vat_responsible: true,
        fiscal_responsibilities: [
          {
            code: 'R-99-PN',
            name: 'No responsable',
          },
        ],
        address: {
          address: 'Cra. 18 #79A - 42',
          city: {
            country_code: 'Co',
            country_name: 'Colombia',
            state_code: '19',
            state_name: 'Cauca',
            city_code: '19001',
            city_name: 'Popayán',
          },
          postal_code: '110911',
        },
        phones: [
          {
            indicative: '57',
            number: '3006003345',
            extension: '132',
          },
        ],
        contacts: [
          {
            first_name: 'Marcos',
            last_name: 'Castillo',
            email: 'marcos.castillo@contacto.com',
            phone: {
              indicative: '57',
              number: '3006003345',
              extension: '132',
            },
          },
        ],
        comments: 'Comentarios',
        related_users: {
          seller_id: 629,
          collector_id: 629,
        },
        metadata: {
          created: '2020-06-15T03:33:17.208Z',
          last_updated: 'null',
        },
      },
      {
        id: '6b6ceb28-b2eb-4b98-b3dd-26648a933c94',
        type: 'Customer',
        person_type: 'Person',
        id_type: {
          code: '13',
          name: 'Cédula de ciudadanía',
        },
        identification: '52414562',
        check_digit: '4',
        name: ['Marcos', 'Castillo'],
        commercial_name: 'Siigo',
        branch_office: 0,
        active: true,
        vat_responsible: true,
        fiscal_responsibilities: [
          {
            code: 'R-99-PN',
            name: 'No responsable',
          },
        ],
        address: {
          address: 'Cra. 18 #79A - 42',
          city: {
            country_code: 'Co',
            country_name: 'Colombia',
            state_code: '19',
            state_name: 'Cauca',
            city_code: '19001',
            city_name: 'Popayán',
          },
          postal_code: '110911',
        },
        phones: [
          {
            indicative: '57',
            number: '3006003345',
            extension: '132',
          },
        ],
        contacts: [
          {
            first_name: 'Marcos',
            last_name: 'Castillo',
            email: 'marcos.castillo@contacto.com',
            phone: {
              indicative: '57',
              number: '3006003345',
              extension: '132',
            },
          },
        ],
        comments: 'Comentarios',
        related_users: {
          seller_id: 629,
          collector_id: 629,
        },
        metadata: {
          created: '2020-06-15T03:33:17.208Z',
          last_updated: 'null',
        },
      },
    ];

    const customerById = customers?.find((customer) => customer.id === id);

    return response(res, 201, customerById); // Devolver la respuesta de la API
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
