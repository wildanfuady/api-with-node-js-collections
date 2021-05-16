const ExtractJwt = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const mysql = require('mysql')
const con = require('./db')
options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = 'donasi-ku'

module.exports = passport => {
	passport.use(new JWTStrategy(options , (jwt_payload , done) => {
        let id = jwt_payload.id;
        con.query("SELECT * FROM users where id = ?" , [id] , (err , result) => {
            if(err){
                return done(null , false);
            } else {
                return done(null , result);
            }
        })
	}))
}
