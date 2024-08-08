const { Store } = require('../data');

module.exports = async () => {
  const stores = await Store.findAll();
  const list = [
    {
      name: 'Tienda 1',
      address: "Calle principal # 13",
      city: "Restrepo",
      phoneNumber: "3105555555",
      email: "cajerotienda1@email.com"
    },
    {
        name: 'Tienda 2',
        address: "Calle principal # 8",
        city: "Cumaral",
        phoneNumber: "3105555555",
        email: "cajerotienda2@email.com"
    },
    {
        name: 'Tienda 3',
        address: "Avenida 40",
        city: "Villavicencio",
        phoneNumber: "3105555555",
        email: "cajerotienda3@email.com"
    },
    {
        name: 'Tienda 4',
        address: "Calle 15",
        city: "Acacias",
        phoneNumber: "3105555555",
        email: "cajerotienda4@email.com"
    },
    {
        name: 'Tienda 5',
        address: "Glorieta de la Grama",
        city: "Villavicencio",
        phoneNumber: "3105555555",
        email: "cajerotienda5@email.com"
    },
    {
        name: 'Tienda 6',
        address: "Aeropuerto Villavicencio",
        city: "Villavicencio",
        phoneNumber: "3105555555",
        email: "cajerotienda6@email.com"
    },
  ];

  if (stores.length <= 0) {
    const stores = list.map((e) => {
      return {
        name: e.name,
        address: e.address,
        city: e.city,
        phoneNumber: e.phoneNumber,
        email: e.email
      };
    });

    await Store.bulkCreate(stores);
    return stores;
  }

  return stores;
};
