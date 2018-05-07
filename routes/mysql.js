const express = require('express')
const router = express.Router()
const {Reservation} = require('./../models/mysql')

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


module.exports = router