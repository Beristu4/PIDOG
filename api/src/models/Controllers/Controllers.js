const {Temperamento, Raza} = require('../../db');
const axios = require('axios');


const infomacionApi = async () =>{
    const url = await axios.get('https://api.thedogapi.com/v1/breeds');
    const info = await url.data.map(b => {
        let altura = []
        let peso = []
        peso = b.weight.metric.split('-'); 
        altura = b.height.metric.split('-');
        peso.length === 2? [pesoMin , pesoMax] = peso : [pesoMax,pesoMin] = peso;
        altura.length === 2? [altMin , altMax] = altura : [altMax,altMin] = altura;
        return {
            id: b.id,
            name: b.name,
            life: b.life_span,
            temperament: b.temperament|| "Active, Athletic, Agile, Confident, Fearless, Protective",
            pesoMax: parseInt(pesoMax)?parseInt(pesoMax): 40 ,
            pesoMin:  parseInt(pesoMin)?parseInt(pesoMin): Math.ceil(pesoMax/2),
            alturaMax: parseInt(altMax)?parseInt(altMax): 32,
            alturaMin: parseInt(altMin)?parseInt(altMin): Math.ceil(altMax/2),
            img: b.image.url,      
        }
    })

    return info;
}

const informacionDb = async() => {
    let data = await Raza.findAll({
        include:{
            model:Temperamento,
            attributes: ['name'],
            throught:{
                attributes:[]
            }
        }
    })
    data = data.map(e => {
        return {
            id: e.id,
            name: e.name,
            life:e.life,
            temperament: e.temperamentos.map(e => e.name).join(', '),
            pesoMax: e.pesoMax,
            pesoMin: e.pesoMin,
            alturaMax: e.alturaMax,
            alturaMin: e.alturaMin,
            img: e.image
        }
    })
    return data
}

const raza = async () =>{
    const info = await infomacionApi();
    const dbInfo = await informacionDb();

    const total = info.concat(dbInfo)

    return total;
}

const addTemperamentDb = async()=>{

    let arregTemp = []

    const data = await infomacionApi()
   
    
data.map(e=>{

        e.temperament.split(",").map(e=>{

            if(!arregTemp.includes(e.trim())){

            arregTemp= [...arregTemp,e.trim()]

            }
        })
        })
        
    arregTemp.sort().map(async(temp)=> await Temperamento.findOrCreate({where:{name: temp}}))
}

// fin 

const getAllTemperamentDb = async () =>{

    await addTemperamentDb()

    const data = await Temperamento.findAll()

    return data
} 

module.exports={
    infomacionApi,
    informacionDb,
    raza,
    addTemperamentDb,
    getAllTemperamentDb
}