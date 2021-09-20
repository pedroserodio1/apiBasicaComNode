const mysql = require("mysql2");

// Recebe a conexão com o banco de dados
const con = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: "root",
   database: "api"
});

module.exports = con;