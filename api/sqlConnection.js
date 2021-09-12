var mysql = require('mysql');

connectionInfo = {
  host: "localhost",
  user: "root",
  // pass: 13578642sqmy
  password: "",
  port: "3306",
  database: "barnamesaziSystemProject"
}
const connection = mysql.createConnection(connectionInfo);

connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    
});

module.exports = connection;
