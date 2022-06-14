import React  from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCardDetail, clearLoad } from "../actions/actions";
import { Link } from "react-router-dom";
import './DetailsRaza.css'

export default function DetailsRaza() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const raza = useSelector((state) => state.detail[0]);

    useEffect(()=>{
        dispatch(getCardDetail(id))
    },[dispatch,id])
   
    return (
        
        <div className="fondo">
            <div className="filtrado">
                <Link to={'/CreateRaza'}>
                    <h1>Create Dogs</h1>
                </Link>
                <Link to={'/Home'} onClick={()=>dispatch(clearLoad())}>
                   <h1>Homepage</h1>
                </Link>
            </div>
     
            {
                raza ? 
        <div >
            <div className="contenedor-principal-detail">
                <div className='info-card-detail '>
                    <h3 className='name'>{raza.name}</h3>
                </div>
                <div className='contenedor-imagen-detail '>
                    <img className='imagen-perro' src={raza.img} alt={raza.name} />
                </div>
                <div className="temperament-detail ">
                    <p><b>Temperamento:</b>{raza.temperament}</p>
                    <p><b>Peso Maximo:</b> {raza.pesoMax} kg</p>
                    <p><b>Peso Minimo:</b> {raza.pesoMin} kg</p>
                    <p><b>Altura Maximo:</b> {raza.alturaMax} cm</p>
                    <p><b>Altura Minimo:</b> {raza.alturaMin} cm</p>
                    <p><b>Life:</b> {raza.life}</p>
                </div>
            </div>
        </div>: 
        <div className="div-loading">
            <img className="img-loading" src={'https://www.punkeritos.com/assets/images/home/dog_loading.gif'} alt='loading'/>
            <h1 className="h1-loading">Cargando...</h1>
        </div> 
            }
        </div>
        
        // <div className="contenedor-principal">
        //     <div className='info-card'>
        //        <h3 className='name'>{raza.name}</h3>
        //     </div>
        //     <div className='contenedor-imagen'>
        //         <img className='imagen-perro' src={raza.img} alt={raza.name} />
        //     </div>
        //     <div className="temperament">
        //         <p><b>Temperamento:</b>{raza.temperament}</p>
        //         <p><b>Peso Maximo:</b> {raza.pesoMax}</p>
        //     </div>
        // </div>
    )
}

