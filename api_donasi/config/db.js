require('dotenv/config')
var mysql = require('mysql')

const con = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

con.connect((err) => {
    if(err) throw err;
    console.log('Koneksi db sukses')
})

module.exports = con