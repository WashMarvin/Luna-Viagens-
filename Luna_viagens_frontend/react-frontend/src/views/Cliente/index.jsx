import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ClienteService from '../../services/ClienteService'

export default function Index() {
    const [clientes, setClientes] = useState([]);

    const getAllClientes = () => {
        ClienteService.getAllClientes()
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getAllClientes();
    }, []);

    const deleteCliente = (id) => {
        ClienteService.deleteCliente(id)
            .then((response) => {
                getAllClientes();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <header className="header">
                <h1 className="container text-center py-4">Cadastro de Clientes</h1>
            </header>
            <div className="container py-3">
                <Link to="/Cliente-Create" className="btn btn-primary mb-4">
                    Cadastrar Cliente
                </Link>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Endereço</th>
                                <th>Email</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Destino</th>
                                <th>Pacote</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td> 
                                <td>{cliente.endereco}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.telefone}</td>
                                <td>
                                    {cliente.destino.cidade} {cliente.destino.estado}
                                </td>
                                <td>{cliente.pacote.nome}</td>
                                <td className="d-flex">
                                    <Link
                                        to={`/Cliente-Update/${cliente.id}`}
                                        className="btn btn-info">
                                        Editar
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteCliente(cliente.id)}
                                        style={{ marginLeft: "10px" }}>
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