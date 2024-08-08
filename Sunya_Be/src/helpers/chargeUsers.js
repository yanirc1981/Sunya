const { data } = require('./users.js');
const { User } = require('../data');
const bcrypt = require('bcrypt');

module.exports = async () => {
  const dataWithHashedPasswords = await Promise.all(
    data.map(async (e) => {
      // Hashear la contraseña antes de guardarla en el objeto
      const hashedPassword = await bcrypt.hash(e.password, 10);
      return {
        first_name: e.first_name,
        last_name: e.last_name,
        id_type: e.id_type,
        nameCompany: e.nameCompany,
        commercialName: e.commercialName,
        person_type: e.person_type,
        password: hashedPassword,
        phone: e.phone,
        city_code: e.city_code,
        state_code: e.state_code,
        n_document: e.n_document,
        email: e.email,
        id_role: e.id_role,
      };
    })
  );

  const users = await User.findAll();

  if (users.length <= 0) {
    const usersToCreate = dataWithHashedPasswords.map((e) => {
      return {
        first_name: e.first_name,
        last_name: e.last_name,
        id_type: e.id_type,
        nameCompany: e.nameCompany,
        commercialName: e.commercialName,
        person_type: e.person_type,
        password: e.password,
        phone: e.phone,
        city_code: e.city_code,
        state_code: e.state_code,
        n_document: e.n_document,
        email: e.email,
        id_role: e.id_role,
      };
    });
    await User.bulkCreate(usersToCreate);
    return usersToCreate;
  }
  return users;
};
