const { Product } = require('../data');

module.exports = async () => {
  const products = await Product.findAll();
  const list = [
    {
      name: 'Yogurt Fresa',
      slug: 'Yogurt litro',
      category: 'yogurt',
      image: 'https://res.cloudinary.com/dmbkoargv/image/upload/v1720824809/plkvm3aqafzjacinuyu4.png',
      price: 12000,
      countInStock: 10,
      brand: '7 maravillas yogurt',
      code: "Item-01",
      description: 'yogurt con probioticos, bajo en grasa, dietetico',
    },
    {
      name: 'Yogurt Mora',
      slug: 'Yogurt litro',
      category: 'yogurt',
      image: 'https://res.cloudinary.com/dmbkoargv/image/upload/v1720824809/plkvm3aqafzjacinuyu4.png',
      price: 12000,
      countInStock: 20,
      brand: '7 maravillas yogurt',
      code: "Item-02",
      description: 'yogurt con probioticos, bajo en grasa, dietetico',
    },
    {
      name: 'Yogurt griego',
      slug: 'Yogurt vaso 250ml',
      category: 'yogurt griego',
      image: 'https://res.cloudinary.com/dmbkoargv/image/upload/v1720826404/jsdzg6w9vqapdnrbgcct.jpg',
      price: 3500,
      countInStock: 15,
      brand: '7 maravillas yogurt griego',
      code: "Item-03",
      description: 'Alta calidad, cremoso, bajo en calorias, con frutas',
    },
    {
      name: 'Queso 7 cueros',
      slug: 'envase de 500 gramos',
      category: 'Queso',
      image: 'https://res.cloudinary.com/dmbkoargv/image/upload/v1720826206/azq0fmblafdiygjbbb5s.jpg',
      price: 12000,
      countInStock: 14,
      brand: '7 maravillas queso 7 cueros',
      code: "L7M-2107",
      id_taxes: 1270,
      description: 'Queso 7 cueros',
    },
    {
      name: 'Queso crema',
      slug: 'Queso crema 500 ml',
      category: 'Queso',
      image: 'https://res.cloudinary.com/dmbkoargv/image/upload/v1720826344/i3aqstv1b73ntmi0qspe.jpg',
      price: 8000,
      countInStock: 14,
      brand: '7 maravillas Queso crema',
      code: "Item-05",
      description: 'Queso crema',
    },
    {
      name: 'Quesadillo',
      slug: 'Quesadillo unidad',
      category: 'Queso',
      image: 'https://res.cloudinary.com/dmbkoargv/image/upload/v1720826294/gd6googzqevdyxfjogu9.jpg',
      price: 5000,
      countInStock: 25,
      brand: '7 maravillas Quesadillo',
      code: "Item-06",
      description: 'Queso y bocadillo',
    },
  ];

  if (products.length <= 0) {
    const products = list.map((e) => {
      return {
        name: e.name,
        slug: e.slug,
        category: e.category,
        image: e.image,
        price: e.price,
        id_taxes: e.id_taxes,
        countInStock: e.countInStock,
        brand: e.brand,
        code: e.code,
        description: e.description,
      };
    });

    await Product.bulkCreate(products);
    return products;
  }

  return products;
};
