const app = require('express').Router()
const mysql = require('mysql')
const response = require('../config/res')
const con = require('../config/db')
const passport = require('passport')

app.get('/donatur', (req, res) => {
    con.query('SELECT * from donatur', (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok(rows, res)
            console.log('success get all donatur')
        }
    })
})

app.get('/donatur/:id', (req, res) => {
    const id = req.params.id

    con.query('SELECT * from donatur where id = ?', [id], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            if(rows.length > 0){
                response.ok(rows, res)
                console.log('success get donatur id')
            }else{  
                response.null('donatur', res)
                console.log('failed get donatur id')
            }
        }
    })
})

app.get('/donatur/d/:id', (req, res) => {
    const id = req.params.id

    con.query('SELECT * from donatur where donasi_id = ?',[id], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            if(rows.length > 0){
                response.ok(rows, res)
                console.log('success get donatur by donasi_id')
            }else{
                response.null('donatur', res)
                console.log('failed get donatur by donasi_id')
            }
        }
    })
})

app.post('/donatur/store', passport.authenticate('jwt' , { session : false }), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))

    con.query('INSERT INTO donatur (name, deskripsi, nominal, donasi_id) values (?, ?, ?, ?)',[data.name, data.deskripsi, data.nominal, data.donasi_id], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok('data berhasil disimpan', res)
            console.log('success insert donatur')
        }
    })
})

app.put('/donatur/update', passport.authenticate('jwt' , { session : false }), (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))

    con.query('UPDATE donatur set name = ?, deskripsi = ?, nominal = ?, donasi_id = ? where id = ?',[data.name, data.deskripsi, data.nominal, data.donasi_id, data.id], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok('data berhasil diubah', res)
            console.log('success update donatur')
        }
    })
})

app.delete('/donatur/delete/:id', passport.authenticate('jwt' , { session : false }), (req, res) => {
    const id = req.params.id

    con.query('DELETE from donatur where id = ?', [id], (error, rows, fields) => {
        if(error){
            console.log(error)
        }else{
            response.ok('data berhasil dihapus', res)
            console.log('success delete donatur')
        }
    })
})

module.exports = app