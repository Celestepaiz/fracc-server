const express = require('express')
const router = express.Router()
const models = require('./../models/postgres')


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
    models.access.all({
        attributes: ["id","modelo", "marca", "placas", "codigo", "id_user"]
    }).then((registros) => {
        res.status(200).json({
             registros: registros
        })
    })
})

router.get('/access/:codigo', (req, res) => {
    models.access.findAll({
        where:{
            codigo: req.params.codigo
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


router.put('/access', (req, res) => {    
    models.access.update(
        {
            modelo: req.body.modelo,
            marca: req.body.marca,
            placas: req.body.placas,
            codigo: req.body.codigo,
            id_user: req.body.id_user
        },
        {
            where: {
                codigo: req.body.codigo
            }                    
        }).then((registro) => {
            res.status(200).json({
                message: "actualizaadooo"
            })  
        }).catch((error) => {
            res.status(400).json({
                error: error
            })
        })
})

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


router.put('/maintenance', (req, res) => {    
    models.maintenance.update(
        {
             concepto: req.body.concepto,
             monto: req.body.monto, 
             fecha_limite: req.body.fecha_limite,
             id_user: req.body.id_user
        },
        {
            where: {
                id: req.body.id
            }                    
        }).then((registro) => {
            res.status(200).json({
                message: "actualizaadooo"
            })  
        }).catch((error) => {
            res.status(400).json({
                error: error
            })
        })
})

router.get('/all-maintenance', (req,res) => {
    models.maintenance.all({
        attributes: ["id","concepto", "monto", "fecha_limite", "id_user"]
    }).then((registros) => {
        res.status(200).json({
            registros: registros
        })
    })
    
})


router.get('/maintenance/:id', (req, res) => {
    models.maintenance.findAll({
        where:{
            id: req.params.id
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

router.put('/payments', (req, res) => {    
    models.payments.update(
        {
            folio: req.body.folio,
            fecha_mant: req.body.fecha_mant,
            calle: req.body.calle,
            numero: req.body.numero,
            concepto: req.body.concepto,
            monto: req.body.monto,
            nombre: req.body.nombre,
            id_user: req.body.id_user
            
        },
        {
            where: {
                folio: req.body.folio
            }                    
        }).then((registro) => {
            res.status(200).json({
                message: "actualizaadooo"
            })  
        }).catch((error) => {
            res.status(400).json({
                error: error
            })
        })
})

router.get('/all-payments', (req,res) => {
    models.payments.all({
        attributes: ["id","folio", "fecha_mant", "calle", "numero", "nombre", "concepto", "monto"]
    }).then((registros) => {
        res.status(200).json({
            registros: registros
        })
    })
    
})


router.get('/payments/:folio', (req, res) => {
    models.payments.findAll({
        where:{
            folio: req.params.folio
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