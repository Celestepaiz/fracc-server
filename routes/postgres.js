const express = require('express')
const router = express.Router()
const models = require('./../models/postgres')

function ObjectToArray (ObjectArray) {
    let aux = []    
    ObjectArray.map((obj) => {
        // console.log(Object.values(obj))
        aux.push(Object.values(obj))
    })
    return aux    
}


router.post('/access', (req,res) => {
    const access = models.access.build({
        modelo: req.body.modelo,
        marca: req.body.marca,
        placas: req.body.placas,
        codigo: req.body.codigo,
        id_user: req.body.id_user
    })

    access.save().then(function(newAccess){
        res.status(200).json({
            message: "ok"
        })
    })
})

router.get('/all-access', (req,res) => {
    models.access.findAll().then((registros) => {
        res.status(200).json({
            registros: ObjectToArray(registros)
        })
    })
    
})

router.get('/access/:id_user', (req, res) => {
    models.access.findAll({
        where:{
            id_user: req.params.id_user
        }
    }).then((registro) => {
        res.status(200).json({
            registro: registro
        })
    })
    
})

router.delete('/access/:codigo', (req, res) => {
    models.access.destroy({
        where:{
            codigo: req.params.codigo
        }
    }).then((registro) =>{
        res.status(200).json({
            message: "eliminado"
        })
    })
})


router.put('/access/:codigo', (req, res) => {
    const access = models.access.update({
        modelo: req.body.modelo,
        marca: req.body.marca,
        placas: req.body.placas
    },{
        returning: true, 
        where:{codigo: req.params.codigo}
    })
})
/*
router.put(‘/book/:bookId’, function (req, res, next) {
    Book.update(
      {title: req.body.title},
      {returning: true, where: {id: req.params.bookId} }
    )
    .then(function([ rowsUpdate, [updatedBook] ]) {
      res.json(updatedBook)
    })
    .catch(next)
   })
*/
router.post('/maintenance', (req, res) => {
    const maintenance = models.maintenance.build({
        concepto: req.body.concepto,
        monto: req.body.monto, 
        fecha_limite: req.body.fecha_limite,
        id_user: req.body.id_user
    })

    maintenance.save().then(function(newMaintenance){
        res.status(200).json({
            message: "ok"
        })
    })
})


router.get('/all-maintenance', (req,res) => {
    models.maintenance.findAll().then((registros) => {
        res.status(200).json({
            registros: ObjectToArray(registros)
        })
    })
    
})


router.get('/maintenance/:id_user', (req, res) => {
    models.maintenance.findAll({
        where:{
            id_user: req.params.id_user
        }
    }).then((registro) => {
        res.status(200).json({
            registro: registro
        })
    })
    
})

router.delete('/maintenance/:_id', (req, res) => {
    models.maintenance.destroy({
        where:{
            id: req.params._id            
        }
    }).then((registro) =>{
        res.status(200).json({
            message: "eliminado"
        })
    })
})


router.post('/payments', (req, res) => {
    const payments = models.payments.build({
        folio: req.body.folio,
        fecha_mant: req.body.fecha_mant,
        calle: req.body.calle,
        numero: req.body.numero,
        concepto: req.body.concepto,
        monto: req.body.monto,
        nombre: req.body.nombre,
        id_user: req.body.id_user
        
    })
    payments.save().then(function(newPayments){
        res.status(200).json({
            message: "ok"
        })
    })
})


router.get('/all-payments', (req,res) => {
    models.payments.findAll().then((registros) => {
        res.status(200).json({
            registros: ObjectToArray(registros)
        })
    })
    
})


router.get('/payments/:id_user', (req, res) => {
    models.payments.findAll({
        where:{
            id_user: req.params.id_user
        }
    }).then((registro) => {
        res.status(200).json({
            registro: registro
        })
    })
    
})

router.delete('/payments/:folio', (req, res) => {
    models.payments.destroy({
        where:{
            folio: req.params.folio
        }
    }).then((registro) =>{
        res.status(200).json({
            message: "eliminado"
        })
    })
})


module.exports = router