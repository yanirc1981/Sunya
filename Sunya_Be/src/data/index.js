require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_DEPLOY,
} = require('../config/envs');
//-------------------------------- CONFIGURACION PARA TRABAJAR LOCALMENTE-----------------------------------
const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
// -------------------------------------CONFIGURACION PARA EL DEPLOY---------------------------------------------------------------------
// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false,
//   native: false,
//   dialect: 'postgres',
// });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Role, User, Product, CartItem, Order, Store, StoreProduct, StoreCashier, Customer } = sequelize.models;

// Aca vendrian las relaciones
// Relacion usuario - rol
User.belongsTo(Role, { foreignKey: 'id_role' });
Role.hasOne(User, { foreignKey: 'id_role' });

User.belongsToMany(Product, {
  through: CartItem,
  foreignKey: 'id_user',
  otherKey: 'id_product',
});
Product.belongsToMany(User, {
  through: CartItem,
  foreignKey: 'id_product',
  otherKey: 'id_user',
});

CartItem.belongsTo(Product, { foreignKey: 'id_product' });

// Relación Orden usuario
Order.belongsTo(User, { foreignKey: 'id_user' });

// Relación orden cliente
Order.belongsTo(Customer, { foreignKey: 'id_customer' });

// Relación de uno a muchos entre Tiendas y Pedidos
Store.hasMany(Order, { foreignKey: 'id_store' });
Order.belongsTo(Store, { foreignKey: 'id_store' });

// Relación muchos a muchos entre Tiendas y Productos a través de StoreProduct
Store.belongsToMany(Product, { through: StoreProduct, foreignKey: 'storeId' });
Product.belongsToMany(Store, { through: StoreProduct, foreignKey: 'productId' });

Store.belongsToMany(User, { through: StoreCashier, foreignKey: 'storeId' });
User.belongsToMany(Store, { through: StoreCashier,  foreignKey: 'userId' });

//---------------------------------------------------------------------------------//
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
