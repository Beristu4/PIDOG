const { Router } = require('express');
const {Temperamento, Raza} = require('../db')
const {raza, getAllTemperamentDb} = require('../models/Controllers/Controllers.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', async (req,res,next)=>{
    const { name } = req.query;
    let totalRaza = await raza();
    try {
        if(name) {
            let razaName = totalRaza.filter(n => n.name.toLowerCase().includes(name.toLowerCase()))
            if(razaName.length){
                res.status(200).send(razaName)
            } else {
                res.status(404).send('No se encontro la raza')
            } 
        }else {
            res.status(200).send(totalRaza)
        }
    } catch (error) {
        next(error)
    }
})

router.get('/dogs/:id', async (req,res, next)=>{
    const  id  = req.params.id;
    try {
        if(id){
                const api = await raza()
                const total = api.filter(el =>`${el.id}`=== `${id}`)
                total ? res.status(200).send(total) : res.status(404).send('El id no corresponde a un perro')
        }
    } catch (error) {
        next(error)
    }   
})

router.get('/temperament' , async (req,res,next)=>{
    try {
       const allTemperament = await getAllTemperamentDb()
       res.status(200).send(allTemperament)
    } catch (error) {
        next(error)
    }
})

router.post('/dog', async (req,res,next)=>{
    try {
        const {name,life,temperament,pesoMax,pesoMin,alturaMax,alturaMin,img} = req.body;
        const perro = await Raza.create({
            name: name,
            life: life,
            pesoMax : pesoMax,
            pesoMin: pesoMin,
            alturaMax: alturaMax,
            alturaMin: alturaMin,
            image: img,
        })
        let temperamentoDb = await Temperamento.findAll({
            where:{name:temperament}
        })
        perro.addTemperamento(temperamentoDb)
        res.send('Perro agregado correctamente')
    } catch (error) {
        next(error)
    }
})

router.delete('/delete/:id', async (req , res, next)=>{
    const id = req.params.id;
    try {
        if(id){
            const db = await Raza.destroy({where:{id}})
            return res.send('Holaaaaaaaa');
        }
    } catch (error) {
        console.log('ENTRO ACA')
        next(error)
    }
})

module.exports = router;
