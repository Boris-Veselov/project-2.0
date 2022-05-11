// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

require('dotenv').config();

// create connection to our db
// process.env.JAWSDB_URL? new Sequelize(process.env.JAWSDB_URL)

const config = require(__dirname + '/../config/config.json')[env];
let sequelize;
config.use_env_variable ? sequelize = new Sequelize(process.env[config.use_env_variable], config)
  :
  sequelize = new Sequelize(config.database, config.username, config.password, config)

// let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PW, 
//     {
//       host: process.env.DB_HOST,
//       dialect: 'mysql',
//       port: 3306
//     });

module.exports = sequelize;