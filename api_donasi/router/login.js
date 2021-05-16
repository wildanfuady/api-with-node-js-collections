const app = require('express').Router()
const mysql = require('mysql')
const response = require('../config/res')
const con = require('../config/db')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

function isAunthenticated(req, res, next){
    var token = req.body.token || req.query.token || req.headers.authorization; // mengambil token di antara request
    if(token){ //jika ada token
      jwt.verify(token, 'jwtsecret', function(err, decoded){ //jwt melakukan verify
        if (err) { // apa bila ada error
          res.json({message: 'Failed to authenticate token'}); // jwt melakukan respon
        }else { // apa bila tidak error
          req.decoded = decoded; // menyimpan decoded ke req.decoded
          next(); //melajutkan proses
        }
      });
    }else { // apa bila tidak ada token
      return res.status(403).send({message: 'No token provided.'}); // melkukan respon kalau token tidak ada
    }
}

app.post('/login', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))

    con.query('SELECT * from users where username = ?', [data.username], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            if(rows.length > 0){
                let pass = crypto.createHash('md5').update(data.password).digest("hex")
                if(pass === rows[0].password) {
                    const payload = {
                        id: rows[0].id,
                        name: rows[0].name,
                    }
                    var token = jwt.sign(payload, 'donasi-ku', {})

                    res.json({message: 'berhasil login', token: token})
                    
                }else{
                    res.json({message: 'password salah'})
                }
            }else{
                response.null('username', res)
                console.log('username tidak ada')
            }
        }
    })
})

module.exports = app