const mysql = require('mysql');
if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
    }
let config_database = {
    connectionLimit : 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'Recipes',
    port: 3306
  };
  let pool = mysql.createPool(config_database);
  
  module.exports = pool;