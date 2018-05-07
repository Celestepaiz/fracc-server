const localStrategy = require('passport-local').Strategy
const passport = require('passport')
const User = require("../models/users")

passport.use("local.signup",new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
}, (req, email, password, done) => {
    User.findOne({"email": email})
    .then((user) => {
        if(user){

            //Para done, el primero es el error, segundo objeto del usuario y tercero algún objeto como mensaje
            return done(null, false, {message : "El mail ya está registrado"})
        }
        const newUser = new User({
            email: email,
            nombre: req.body.nombre,
            calle: req.body.calle,
            numero: parseInt(req.body.numero),
            rol: req.body.rol
        })

        newUser.password = newUser.hashPassword(password)
        newUser.save((err) => err ? done(null, false, { message : "Ha ocurrido un error"}): done(null,newUser))
    }).catch( (err) => done(err) )

}))

passport.use('local.signin',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
},(email, password, done) => {
    User.findOne({'email': email})
    .then( (user) => {
        console.log(user)
        if(!user){
            console.log("murio aca")
            return done(null, false, { message : "Email o password incorrectos"})
        }
        if(!user.validatePassword(password)){
            console.log("nel aca")
            
            return done(null, false, { message : "Email o password incorrectos"})
        }
        return done(null, user)
    }).catch(  (err) => done(err) )
}))