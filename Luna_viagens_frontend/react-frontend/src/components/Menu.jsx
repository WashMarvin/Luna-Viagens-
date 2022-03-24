import React from 'react'
import { Link } from 'react-router-dom'


export default function Menu() {
    return (

        <div className="container menu">
            <Link to="/"><img id="image" src="./img/logo.png" alt="luna_viagens" /></Link>
            <div className="menu-section">
                <div className="menu-toggle">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/clientes" >Cliente</Link>
                        </li>
                        <li>
                            <Link to="/destinos">Destino</Link>
                        </li>
                        <li>
                            <Link to="/pacotes">Pacotes</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
