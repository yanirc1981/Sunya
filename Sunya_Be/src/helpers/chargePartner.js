const { Partner } = require('../data');

module.exports = async () => {
  const partners = await Partner.findAll();
  const list = [
    {
      name: 'Nombre Tienda Aliada 1',
      address: 'Direccion tienda aliada 1',
      city: 'Restrepo',
      country: 'Meta',
      phone: '3105555555',
      image:
        'https://res.cloudinary.com/dmbkoargv/image/upload/v1720828244/vxns4agrzq8yudypqyd6.jpg',
    },
    {
      name: 'Nombre Tienda Aliada 2',
      address: 'Direccion tienda aliada 2',
      city: 'Restrepo',
      country: 'Meta',
      phone: '3105555555',
      image:
        'https://res.cloudinary.com/dmbkoargv/image/upload/v1720828244/vxns4agrzq8yudypqyd6.jpg',
    },
    {
      name: 'Nombre Tienda Aliada 3',
      address: 'Direccion tienda aliada 3',
      city: 'Restrepo',
      country: 'Meta',
      phone: '3105555555',
      image:
        'https://res.cloudinary.com/dmbkoargv/image/upload/v1720828244/vxns4agrzq8yudypqyd6.jpg',
    },
    {
      name: 'Nombre Tienda Aliada 4',
      address: 'Direccion tienda aliada 4',
      city: 'Restrepo',
      country: 'Meta',
      phone: '3105555555',
      image:
        'https://res.cloudinary.com/dmbkoargv/image/upload/v1720828244/vxns4agrzq8yudypqyd6.jpg',
    },
  ];

  if (partners.length <= 0) {
    const partners = list.map((e) => {
      return {
        name: e.name,
        address: e.address,
        city: e.city,
        country: e.country,
        phone: e.phone,
        image: e.image,
      };
    });

    await Partner.bulkCreate(partners);
    return partners;
  }

  return partners;
};
