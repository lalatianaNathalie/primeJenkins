const { Sequelize } = require('sequelize');

require("dotenv").config();
const db_name = process.env.DB_NAME;
const user =process.env.DB_USER
const password = process.env.PASSWORD
const host = process.env.HOST
const dialect = process.env.DIALECT

// Configurer la connexion MySQL
const sequelize = new Sequelize( db_name, user, password, {
  host: host,
  dialect: dialect,
});

module.exports = sequelize;
