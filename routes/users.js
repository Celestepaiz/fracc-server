const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const utility = require('../utility')

router.post("/register",(request, response, next) => {
    passport.authenticate('local.signup',(err, user, info) => {

        if (err || !user){
            return response.status(400).json({
                message: info ? info.message : "Ha ocurrido un error",
                error: err
            });
        }
        const token = jwt.sign(user.toJSON(), 'nami<3')
        return response.status(200).json({token, expiresIn: 5600})
    })(request, response, next)
    
})


router.post("/login",(request, response, next) => {
    passport.authenticate('local.signin',(err, user, info) => {

        if (err || !user){
            return response.status(400).json({
                message: info ? info.message : "Ha ocurrido un error"
            });
        }
        const token = jwt.sign(user.toJSON(), 'nami<3')
        return response.status(200).json({token, expiresIn: 5600})
    })(request, response, next)
    
})

router.get('/users', (req,res) => {
    User.find({rol:"propietario"}).select({_id:1,nombre:1})
    .then((users) => {
        return res.status(200).json({
            users: users
        })
    })
})


router.get('/all-users', (req,res) => {
    User.find({rol:"propietario"}).select({nombre:1})
    .then((users) => {
        return res.status(200).json({
            users: utility.ObjectToArray(users)
        })
    })
    
})


module.exports = router
