var mysql = require('mysql');

connectionInfo = {
  host: "localhost",
  user: "root",
  password: "13578642sqmy",
  port: "3306",
  database: "barnamesaziSystemProject"
}
const connection = mysql.createConnection(connectionInfo);

connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    
});

module.exports = connection;
