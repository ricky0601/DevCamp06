// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'Youtube',
    port: 3307,
    dateStrings: true,
});

module.exports = connection;