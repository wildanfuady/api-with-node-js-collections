const app = require('express').Router()
const cors = require('cors')
const myqsl = require('mysql')
const response = require('../config/res')
const con = require('../config/db')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const login = require('./login')

app.use(cors())
app.get('/donasi', (req, res) => {
    con.query('SELECT * from donasi', (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok(rows, res)
            console.log('success get all donasi')
        }
    })
})

app.get('/donasi/:id', (req, res) => {
    const id = req.params.id

    con.query('SELECT * from donasi where id = ?',[id], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok(rows, res)
            console.log('succes get donasi id')
        }
    })
})

app.post('/donasi/store', passport.authenticate('jwt' , { session : false }), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))

    con.query('INSERT INTO donasi (name) values (?)', [data.name], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok('data berhasil disimpan', res)
            console.log('success insert donasi')
        }
    })
})

app.put('/donasi/update', passport.authenticate('jwt' , { session : false }), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))

    con.query('UPDATE donasi set name = ? where id = ?', [data.name, data.id], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok('data berhasil diubah', res)
            console.log('success update donasi')
        }
    })
})

app.delete('/donasi/delete/:id', passport.authenticate('jwt' , { session : false }), (req, res) => {
    const id = req.params.id

    con.query('DELETE from donasi where id = ?',[id], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok('data berhasil dihapus',res)
            console.log('success delete donasi')
        }
    })
})

module.exports = app