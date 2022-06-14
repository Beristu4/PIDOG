
import {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs,orderByPeso,orederByName,orderByRaza,searchDogByName,filterByTemperament, getAllTemperament} from "../actions/actions";
import { Link } from "react-router-dom";
import Card from './Card'
import './Home.css'
import Paginado from "./Paginado";


export default function Home(){
    const dispatch = useDispatch();
    const totalDog = useSelector((state) => state.raza)
    const stateTemperament = useSelector((state) => state.temperamentState)
    const [orden,setOrden] = useState('')
    const [paginaPrincipal,setPaginaPrincipal] = useState(1);
    const dogPorPagina = 8;
    const ultimoPerro =paginaPrincipal * dogPorPagina;//8
    const primerPerro = ultimoPerro - dogPorPagina;//0
    const sliceDog = totalDog.slice(primerPerro, ultimoPerro);
  
    
    const paginado = (pagenumber) => {
        setPaginaPrincipal(pagenumber)
    }

    useEffect(()=>{
        dispatch(getDogs())
        dispatch(getAllTemperament())
    }, [dispatch])

    function handleOrderByPeso(e){
        e.preventDefault();
        dispatch(orderByPeso(e.target.value))
        setPaginaPrincipal(1);
        setOrden(e.target.value)
    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orederByName(e.target.value))
        setPaginaPrincipal(1);
        setOrden(e.target.value)
    }

    function handleFilterByRaza(e){
        dispatch(orderByRaza(e.target.value))
    }

    function handleSearchByName(e){
        e.preventDefault();
        if(!orden){
            alert('Debe colocar el nombre de un perro')
        }
        dispatch(searchDogByName(orden))
        setPaginaPrincipal(1);
       
        
    }

    function handleChange(e){
            setOrden(e.target.value)
    }

    function handlefilterByTemperament(e){
        dispatch(filterByTemperament(e.target.value))
        setPaginaPrincipal(1)
    }

    
    return (
        <div className="nav">
            <div className="filtrado">
            <Link to={'/CreateRaza'}>
                <h1 className="h1-nav">Create Dogs</h1>
            </Link>
                <div className="ascYdes">
                    <select onChange={e => handleOrderByName(e)} name="orden" id="select-filter" >
                        <option value="asc"> A - Z</option>
                        <option value="des"> Z - A</option>
                    </select>
                </div>
                <div className="peso">
                    <p>
                    Peso: 
                    <select  onChange={e => handleOrderByPeso(e)} name="peso" id="select-filter">
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    </p>
                </div>
                <div className="seccion-input"> 
                <form onSubmit={e => handleSearchByName(e)}>
                    <input onChange={e =>handleChange(e)} type="search"  /><button >Buscar</button>
                </form>
                </div>
                <div className="temperamento">
                    <p>
                        Temperamento:
                    <select onChange={e => handlefilterByTemperament(e)} name="temperament" id="select-filter">
                        <option value="todos">Todos</option>
                        {
                           stateTemperament?.map(e => {
                               return (
                                   <option value={e.name} key={e.id}> {e.name}</option>
                               )
                           })
                        }
                    </select>
                    </p>
                </div>
                <div className="raza">
                    <p>
                        Raza:
                    <select  onChange={e =>handleFilterByRaza(e)} id="select-filter" >
                    <option value="todos">Todos</option>
                        <option value="creados">Creados</option>
                        <option value="api">Desde la Api</option>
                    </select>
                    </p>
                </div>
            <Link to={'/'}>
               <h1 className="h1-nav">Exit</h1>
            </Link>
            </div>
            <div className="card-completo">
            {sliceDog?.map((d)=>{
                return(
                    <div className="div-card" key={d.id}>
                        <Link to={'/dogs/' + d.id}>
                            <Card 
                            name={d.name} 
                            image={d.img ? d.img : d.image} 
                            temperament={d.temperament} 
                            pesoMax={d.pesoMax}
                            id={d.id}
                            />
                        </Link>
                    </div>
                );
            })}
        
            <Paginado 
            dogPorPagina={dogPorPagina}
            totalDog={totalDog.length}
            paginado= {paginado}
            paginaPrincipal={paginaPrincipal}
            />
            </div>
        </div>
    )
}