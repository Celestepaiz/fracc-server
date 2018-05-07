const express = require('express')
const router = express.Router()
const {Reservation} = require('./../models/mysql')

function ObjectToArray (ObjectArray) {
    let aux = []    
    ObjectArray.map((obj) => {
        // console.log(Object.values(obj))
        aux.push(Object.values(obj))
    })
    return aux    
}


router.post('/Reservation', (request, response, next) => {
    Reservation.create(request.body)
    .then((model) => {
        response.status(200).json({
            message: "Ok"
        })
    })
    .catch((error) => {
        response.status(400).json({
            message: "error",
            error: error
        })

    })
})


router.delete('/Reservation/:id', (req, res, next) => {
    Reservation.destroy({
        where:{
            id: req.params.id
        }
    }).then((model) =>{
        res.status(200).json({
            message: "eliminado"
        })
    })
    .catch((error) => {
        response.status(400).json({
            message: "error",
            error: error
        })
    })
})


router.get('/all-reservations', (req,res) => {
    Reservation.all({
        attributes: ["id", "titulo", "descripcion", "fecha_inicio", "fecha_fin", "hora_inicio", "hora_fin"]
    }).then((registros) => {
        res.status(200).json({
            registros: registros
        })
    })
    
})



module.exports = router