const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

function ObjectToArray (ObjectArray) {
    let aux = []    
    ObjectArray.map((obj) => {
        // console.log(Object.values(obj))
        aux.push(Object.values(obj))
    })
    return aux    
}


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
    User.find({rol:"propietario"})
    .select({_id:1, nombre:1, email:1, calle:1, numero:1})
    .then((users) => {
        return res.status(200).json({
            users: users
        })
    })
    
})

router.get('/user/:_id', (req, res) => {
    User.findById(req.params._id)
        .then((user) => {
            return res.status(200).json({
                user: user
            })
        })
})

router.delete('/delete-user/:_id', (req,res) => {
    User.findByIdAndRemove(req.params._id)
        .then(() => {
            res.status(200).json({
                message: "ok"
            })
        })
})

router.put('/update-user', (req, res) => {
    User.findByIdAndUpdate(req.body._id, req.body, {new:true}).then(() => {
        res.status(200).json({
            message: "ok"
        })
    })
})


module.exports = router
