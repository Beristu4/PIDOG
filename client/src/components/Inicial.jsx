import React from "react";
import { Link } from "react-router-dom";
import './Inicial.css';

export default function Inicial(){
    return (
        <div className="principal">
            <div className="titulo">
                <h1>Dog Api</h1>
            </div>
            <div className="wrapper">
                <Link to={'/home'}>
                    <button className="button">Ingresar</button>
                </Link>
            </div>
        </div>
    )
}