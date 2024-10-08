const { Product } = require('../data');

module.exports = async () => {
  const products = await Product.findAll();
  const list = [
    {
      name: 'Manteles',
      slug: 'Caminos de mesa',
      category: 'Artesania',
      images: ['https://res.cloudinary.com/djkq5h1et/image/upload/v1723460239/WhatsApp_Image_2024-07-05_at_22.21.41_3_sqzmwo.jpg'],
      image: 'https://res.cloudinary.com/djkq5h1et/image/upload/v1723460239/WhatsApp_Image_2024-07-05_at_22.21.41_3_sqzmwo.jpg',
      price: 12000,
      countInStock: 10,
      brand: 'Sunya Artesanías',
      code: "Item-01",
      description: 'Tejidos a mano, varios colores',
    },
    {
      name: 'Laveros',
      slug: 'Llaveros ',
      category: 'Artesania',
      images: ['https://res.cloudinary.com/djkq5h1et/image/upload/v1723461970/WhatsApp_Image_2024-07-05_at_22.21.41_vo3eyt.jpg'],
      image: 'https://res.cloudinary.com/djkq5h1et/image/upload/v1723461970/WhatsApp_Image_2024-07-05_at_22.21.41_vo3eyt.jpg',
      price: 12000,
      countInStock: 20,
      brand: 'Sunya Artesanías',
      code: "Item-02",
      description: 'Elegí tu modelo',
    },
    {
      name: 'Jarrones',
      slug: 'Jarrones',
      category: 'Artesania',
      images: ['https://res.cloudinary.com/djkq5h1et/image/upload/v1723461938/WhatsApp_Image_2024-07-05_at_22.21.41_1_fjwnlc.jpg','https://res.cloudinary.com/djkq5h1et/image/upload/v1723461938/WhatsApp_Image_2024-07-05_at_22.21.41_1_fjwnlc.jpg'],
      image: 'https://res.cloudinary.com/djkq5h1et/image/upload/v1723461938/WhatsApp_Image_2024-07-05_at_22.21.41_1_fjwnlc.jpg',
      price: 3500,
      countInStock: 15,
      brand: 'Sunya Artesanías',
      code: "Item-03",
      description: 'Jarrones, pintados a mano, la mejor calidad',
    },
    {
      name: 'Sahumerios',
      slug: 'Caja x 10',
      category: 'Artesania',
      images: ['https://res.cloudinary.com/djkq5h1et/image/upload/v1723461930/WhatsApp_Image_2024-07-05_at_22.21.40_wr4n3h.jpg'],
      image: 'https://res.cloudinary.com/djkq5h1et/image/upload/v1723461930/WhatsApp_Image_2024-07-05_at_22.21.40_wr4n3h.jpg',
      price: 12000,
      countInStock: 14,
      brand: 'Sunya Artesanías',
      code: "L7M-2107",
      id_taxes: 1270,
      description: 'Aromas que enamoran',
    },
    {
      name: 'Bolsos',
      slug: 'Bolsos Artesanales',
      category: 'Artesania',
      images: ['https://res.cloudinary.com/djkq5h1et/image/upload/v1723461918/WhatsApp_Image_2024-07-05_at_22.21.40_1_vaklqx.jpg'],
      image: 'https://res.cloudinary.com/djkq5h1et/image/upload/v1723461918/WhatsApp_Image_2024-07-05_at_22.21.40_1_vaklqx.jpg',
      price: 8000,
      countInStock: 14,
      brand: 'Sunya Artesanías',
      code: "Item-05",
      description: 'Tejidos a mano, elegí el que más te guste',
    },
    {
      name: 'Bolsos Tejidos',
      slug: 'Bolsos grandes',
      category: 'Artesanía',
      images: ['https://res.cloudinary.com/djkq5h1et/image/upload/v1723461924/WhatsApp_Image_2024-07-05_at_22.21.40_2_mdt8hr.jpg','https://res.cloudinary.com/djkq5h1et/image/upload/v1723461924/WhatsApp_Image_2024-07-05_at_22.21.40_2_mdt8hr.jpg'],
      image: 'https://res.cloudinary.com/djkq5h1et/image/upload/v1723461924/WhatsApp_Image_2024-07-05_at_22.21.40_2_mdt8hr.jpg',
      price: 5000,
      countInStock: 25,
      brand: 'Sunya Artesanías',
      code: "Item-06",
      description: 'Hermosos bolsos tejidos a mano, grandes',
    },
    {
      name: 'Adornos',
      slug: 'Calaveras ',
      category: 'Artesanía',
      images: ['https://res.cloudinary.com/djkq5h1et/image/upload/v1723437141/ouk4qntnavbioci4efxw.jpg','https://res.cloudinary.com/djkq5h1et/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1723437141/ouk4qntnavbioci4efxw.jpg'],
      image: 'https://res.cloudinary.com/djkq5h1et/image/upload/v1723437141/ouk4qntnavbioci4efxw.jpg',
      price: 5000,
      countInStock: 25,
      brand: 'Sunya Artesanías',
      code: "Item-07",
      description: 'Decoración del hogar, pintadas a mano',
    },
    {
      name: 'Floreros',
      slug: 'Grandes',
      category: 'Artesanía',
      images: ['https://res.cloudinary.com/djkq5h1et/image/upload/v1723417396/WhatsApp_Image_2024-07-05_at_22.21.42_htxwog.jpg','https://res.cloudinary.com/djkq5h1et/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1723417396/WhatsApp_Image_2024-07-05_at_22.21.42_htxwog.jpg'],
      image: 'https://res.cloudinary.com/djkq5h1et/image/upload/v1723417396/WhatsApp_Image_2024-07-05_at_22.21.42_htxwog.jpg',
      price: 5000,
      countInStock: 25,
      brand: 'Sunya Artesanías',
      code: "Item-08",
      description: 'Hechos a mano, artesanales',
    },
 
  ];

  if (products.length <= 0) {
    const products = list.map((e) => {
      return {
        name: e.name,
        slug: e.slug,
        category: e.category,
        image: e.image,
        images: e.images,
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
