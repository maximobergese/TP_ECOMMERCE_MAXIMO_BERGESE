const mysql = require('mysql2/promise'); 

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '446578392003',
    database: 'tp4ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = db;
