const { Partner } = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  const partner = req.body;

  await Partner.create({
    name: partner.name,
    image: partner.image,
    address: partner.address,
    city: partner.city,
    country: partner.country,
    phone: partner.phone,
  });
  response(res, 201, 'success');
};
