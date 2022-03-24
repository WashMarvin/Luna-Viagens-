import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DestinoService from '../../services/DestinoService'

export default function Index() {
    const [destinos, setDestinos] = useState([]);


const getAllDestinos = () => {
    DestinoService.getAllDestinos()
    .then((response) => {
        setDestinos(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
}

useEffect(() => {
    getAllDestinos();
}, []);

const deleteDestino = (id) => {
    DestinoService.deleteDestino(id)
    .then((response) => {
        getAllDestinos();
    })
    .catch((error) => {
        console.log(error);
    })
}

return (
    <>
    <header className="header">
        <h2 className="container text-center py-4">Cadastro de destinos</h2>
    </header>
    <div className="container py-3">
        <Link 
        to="/Destino-Create" className="btn btn-primary mb-4">
        Criar destino
        </Link>
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {destinos.map((destino) =>(
                    <tr key={destino.id}>
                        <td>{destino.id}</td>
                        <td>{destino.cidade}</td>
                        <td>{destino.estado}</td>
                        <td>{destino.data}</td>
                        <td>{destino.hora}</td>
                        <td>{destino.cliente}</td>
                        
                        <td className="d-flex">
                            <Link to={`/Destino-Update/${destino.id}`}
                            className="btn btn-info">Editar
                            </Link>
                            <button 
                            className="btn btn-danger"
                            onClick={() => deleteDestino(destino.id)}
                            style={{ marginLeft: "10px"}}
                            >
                                Deletar
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
)

}