const app = require('./src/app.js');
const { conn } = require('./src/data');
const { PORT } = require('./src/config/envs.js');
const helpers = require('./src/helpers');

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  app.listen(PORT, () => {
    console.log(`🚀 listening on port: ${PORT} 🚀`);
  });
  await helpers.chargeRol();
  await helpers.chargeUsers();
  await helpers.chargeProduct();
  //await helpers.chargeStore();
  //await helpers.chargePartner();
});
