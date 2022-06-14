import React from "react";
import './Paginado.css'
import img from './153-1533036_adopta-icono-perro-png.png'

export default function Paginado({dogPorPagina, totalDog, paginado, paginaPrincipal}){

    const pageNumber = []
    
    for (let i = 0; i <= Math.floor((totalDog/dogPorPagina)) ; i++) {
        pageNumber.push(i + 1);
    }

    return (
        <div className="div-paginado">
            <ul className="ul-paginado">
                {
                    pageNumber?.map( e =>{
                        let active = (paginaPrincipal === e);
                        return (
                        <li className={active ? 'active' : 'inactive'} key={e}>  
                            <img src={img} onClick={()=> paginado(e)} alt="paginado" width='40px' height='40px'/>{e}
                        </li>
                )})}
            </ul>
        </div>
    )
}
