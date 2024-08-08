const { User } = require("../data");
const response = require("../utils/response");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {

  const user = req.body;

  console.log(user)

  const existingUser = await User.findOne({ where: { n_document: user.n_document } });

  if (existingUser) {
    // Si ya existe un usuario con ese n_document, devuelve un error
    return response(res, 400, "El usuario con este número de documento ya existe.");
  }

  // Encriptar password
  const hash = await bcrypt.hash(user.password, 10);

  // Crear el nuevo usuario
  await User.create({
    first_name: user.first_name,
    last_name: user.last_name,
    nameCompany: user.nameCompany,
    commercialName: user.commercialName,
    id_type: user.idType,
    person_type: user.person_type,
    n_document: user.n_document,
    email: user.email,
    password: hash,
    phone: user.phone,
    city: user.city,
    id_role: user.id_role
  });

  response(res, 201, "success");
};
