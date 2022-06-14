import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {deleteDog, getDogs} from '../actions/actions'
import './Cards.css'


export default function Card({name,image,temperament,id,pesoMax}){
    const dispatch = useDispatch()

    function handleDelete(e){
        e.preventDefault()
        dispatch(deleteDog(e.target.value))
        alert('Perro Eliminado correctamente')
        dispatch(getDogs())
    }
    return (
        <div className="contenedor-principal" key={id}>
            <div className="grid-item">
                <div className='info-card'> 
                    {
                    !Number(id) ? <button className="" value={id} onClick={(e)=>handleDelete(e)}>x</button> : null
                    }
                <Link to={'/dogs/' + id}>
                    <h3 className='name'>{name}</h3>
                </Link>
                </div>
                <div className='contenedor-imagen'>
                    <img className='imagen-perro' src={image} alt={name}/>
                </div>
                <div className="temperament">
                    <p><b>Temperamento:</b>{temperament}</p>
                    <p><b>Peso Maximo:</b>{pesoMax}</p>
                </div>
            </div>
        </div>
    )
}