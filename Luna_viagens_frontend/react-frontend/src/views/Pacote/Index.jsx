import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PacoteService from "../../services/PacoteService"

export default function Index() {
    const [pacotes, setPacotes] = useState([]);

    const getAllPacotes = () => {
        PacoteService.getAllPacotes()
        .then((response) => {
            setPacotes(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getAllPacotes();
    }, []);

    const deletePacote = (pacoteId) => {
        PacoteService.deletePacote(pacoteId)
        .then((response) => {
            getAllPacotes();
        })
        
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <header className="header">
                <h3 className="container">Cadastro de pacotes</h3>
            </header>
            <div className="container py-3">
                <Link to="/Pacote-Create" className="btn btn-primary mb-2">
                    Criar pacote
                </Link>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>Hotel</th>
                                <th>Período (dias)</th>
                                <th>Cliente</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacotes.map((pacote) => (
                            <tr key={pacote.id}>
                                <td>{pacote.id}</td>
                                <td>{pacote.nome}</td>
                                <td>{pacote.cidade}</td>
                                <td>{pacote.estado}</td>
                                <td>{pacote.estado}</td>
                                <td>{pacote.hotel}</td>
                                <td>{pacote.periodo}</td>
                                
                                <td className="d-flex">
                                    <Link
                                    to={`/Pacote-Update/${pacote.id}`}
                                    className="btn btn-info"
                                    >
                                    Editar
                                    </Link>
                                    <button className="btn btn-danger"
                                    onClick={() => deletePacote(pacote.id)}
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