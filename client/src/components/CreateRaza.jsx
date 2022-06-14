import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { getAllTemperament,clearLoad, postDog } from "../actions/actions";
import './CreateRaza.css'



function validacion(input){
    let errores = {}
    // NOMBRE -------------------------------------
    if(!input.name){
        errores.name = 'Se requiere nombre'
    } else if(input.name.length < 6){
        errores.name = 'El nombre debe tener al menos 6 caracteres'
    } else if(input.name.length > 20){
        errores.name = 'ÉL nombre no puede tener mas de 20 caracteres'
    } else if (!/^[a-zA-Z ]*$/.test(input.name)){
        errores.name = 'El nombre no puede tener numeros'
    }
    // ALTURA MAXIMA ------------------------------
    if(!input.alturaMax){
        errores.alturaMax = 'Se requiere altura maxima'
    } else if(input.alturaMax > 100 || input.alturaMax <= 0 ){
        errores.alturaMax = 'La altura debe ser de 1 a 100 cm'
    }
    //ALTURA MINIMA -------------------------------
    if(!input.alturaMin){
        errores.alturaMin = 'Se requiere altura minima'
    } else if(input.alturaMin > input.alturaMax){
        errores.alturaMin = 'La altura minima no puede ser mayor que la altura maxima'
    }else if(input.alturaMin >= 100 || input.alturaMin <= 0 ){
        errores.alturaMin = 'La altura debe ser de 1 a 100 cm'
    }
    // PESO MAXIMO --------------------------------
    if(!input.pesoMax){
        errores.pesoMax = 'Se requiere altura maxima'
    } else if(input.pesoMax >= 100 || input.pesoMax <= 0 ){
        errores.pesoMax = 'La altura debe ser de 1 a 100 cm'
    }
    //TEMPERAMENTO --------------------------------
    if(input.temperament.length < 0){
        errores.temperament = 'Se requiere al menos un temperamento'
    }
    //PESO MINIMO ---------------------------------
    if(!input.pesoMin){
        errores.pesoMin = 'Se requiere peso minimo'
    } else if(input.pesoMin >= input.pesoMax){
        errores.pesoMin = 'El peso minimo no puede ser mayor al peso maximo'
    }else if(input.pesoMin >= 100 || input.pesoMin <= 0 ){
        errores.pesoMin = 'El peso debe ser de 1 a 100 kg'
    }
    //LIFE ----------------------------------------
    if(!input.life){
        errores.life = 'Se requiere tiempo de vida'
    } else if(input.life > 20 || input.life <= 0){
        errores.life = 'El tiempo de vida debe ser entre 1 y 20'
    }
    return errores
}



export default function CreateRaza(){

    const dispatch = useDispatch();
    const temperament = useSelector((state)=> state.temperamentState)
    const [errores , setErrores] = useState({})
    const comprobante = Object.keys(errores).length === 0 ? true : false
   
    const [input, setInput] = useState({
        name: "",
        alturaMax:"",
        alturaMin:"",
        pesoMax:"",
        pesoMin:"",
        life:"",
        temperament:[],
        img: '' || 'https://svgsilh.com/svg/1420404.svg'
    })

    useEffect(()=>{
        dispatch(getAllTemperament())
    },[dispatch])

    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrores(validacion({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        e.preventDefault()
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament:[...input.temperament, e.target.value]
            })
            setErrores(validacion({
                ...input,
                [e.target.name]:[e.target.value]
            }))
        }
        
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postDog(input));
        setInput({
            name: "",
            alturaMax:"",
            alturaMin:"",
            pesoMax:"",
            pesoMin:"",
            life:"",
            temperament:[],
            img:""
        })
        alert('El perro se creo correctamente')
       
    }

    function handleDelete(e){
        e.preventDefault()
        const arra1 = input.temperament
        setInput({
            ...input,
            temperament: arra1.filter(tem => tem !== e.target.name)
        })
    }
    return (
        <div>
            <div className="fondo-create">
                <div className="filtrado">
                    <Link to={'/'}>
                        <h1>Landing</h1>
                    </Link>
                    <h1>Crea tu Raza</h1>
                    <Link to={'/Home'} onClick={()=>dispatch(clearLoad())}>
                    <h1>Homepage</h1>
                    </Link>
                </div>
                <div className="formulario">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                        <label>Nombre:</label>
                        {
                            errores.name && (
                                <p className="error">{errores.name}</p>
                            )
                        }
                        <input type="text" value={input.name} name='name' onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Altura Maxima:</label>
                            {
                            errores.alturaMax && (
                                <p className="error">{errores.alturaMax}</p>
                            )
                        }
                            <input type="number" value={input.alturaMax} name='alturaMax' onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Altura Minima:</label>
                            {
                            errores.alturaMin && (
                                <p className="error">{errores.alturaMin}</p>
                            )
                            }
                            <input type="number" value={input.alturaMin} name='alturaMin' onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Peso Maximo:</label>
                            {
                            errores.pesoMax && (
                                <p className="error">{errores.pesoMax}</p>
                            )
                            }
                            <input type="number" value={input.pesoMax} name='pesoMax'onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Peso Minimo:</label>
                            {
                            errores.pesoMin && (
                                <p className="error">{errores.pesoMin}</p>
                            )
                            }
                            <input type="number" value={input.pesoMin} name='pesoMin' onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Tiempo de vida:</label>
                            {
                            errores.life && (
                                <p className="error">{errores.life}</p>
                            )
                            }
                            <input type="number" value={input.life} name='life' onChange={handleChange}/>
                        </div>
                        <div className="div-temperamentos">
                            <label>Temperamentos</label>
                            <select onChange={(e) =>handleSelect(e)} disabled={input.temperament.length === 5}>
                            {
                                temperament?.map(e =>(
                                    <option value={e.name} key={e.id}>{e.name}</option>
                                ))
                            }
                            </select>
                            {
                            errores.temperament && (
                                <p className="error">{errores.temperament}</p>
                            )
                            }
                            <ul>
                                <li>

                                    {input.temperament.map(e => 
                                    <div key={e}>
                                        <p>{e}</p>
                                        <button  className="boton-temperamento" name={e} onClick={(e)=>handleDelete(e)}>x</button>    
                                    </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <label>Imgen Url:</label>
                            <input type="text" value={input.img} name='img' onChange={handleChange}/>
                        </div>
                        <div>
                           <button type="submit" className="boton" disabled={comprobante && input.name && input.alturaMax && input.temperament.length > 0 && input.alturaMin && input.pesoMin && input.pesoMax && input.life ? false : true}>Crear Raza</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}