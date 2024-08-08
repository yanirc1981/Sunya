const { Role } = require("../data");

module.exports = async () => {
  const roles = await Role.findAll();
  const list = [
    {
      id: 1,
      name: "usuario",
    },
    {
      id: 2,
      name: "cajero",
    },
    {
      id: 3,
      name: 'admin' 
    },
    {
      id: 4,
      name: 'superAdmin' 
    },
  ];

  if (roles.length <= 0) {
    const roles = list.map((e) => {
      return {
        name: e.name,
      };
    });
    await Role.bulkCreate(roles);
    return roles;
  }
  return roles;
};
