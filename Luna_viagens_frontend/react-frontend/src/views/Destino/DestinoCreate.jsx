import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DestinoService from '../../services/DestinoService'
import ClienteService from '../../services/ClienteService';

export default function Create() {
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [cliente, setCliente] = useState("");
    const [clientes, setClientes] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const getAllClientes = () => {
        ClienteService.getAllClientes().then((response) => {
            setClientes(response.data);
        })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllClientes();
    }, []);


    const criarOuEditarDestino = (e) => {
        e.preventDefault();

        const destino = { cidade, estado, data, hora };

        if (id) {
            DestinoService.updateDestino(id, destino)
                .then((response) => {
                    navigate("/destinos")
                })
        } else {
            DestinoService.createDestino(destino)
                .then((response) => {
                    navigate("/destinos")
                })
        }
    }

    useEffect(() => {
        function getDestinoById() {
            if (id) {
                DestinoService.getDestinoById(id)
                    .then((response) => {
                        setCidade(response.data.cidade);
                        setEstado(response.data.estado);
                        setData(response.data.data);
                        setHora(response.data.hora);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        getDestinoById()
    }, [id]);

    return (
        <div className="container py-3">
            <form>
                <fieldset>
                    <legend>
                        <h2 className="text-center">{id ? "Editar Destino" : "Adicionar Destino"}</h2>
                    </legend>
                    <div className="mb-3">
                        <label htmlFor="Cidade" className="form-label">Cidade</label>
                        <input
                            type="text"
                            id="Cidade"
                            placeholder="Cidade de destino"
                            className="form-control"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Estado" className="form-label">Estado</label>
                        <input
                            type="text"
                            id="Estado"
                            placeholder="Estado"
                            className="form-control"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Data" className="form-label">Data</label>
                        <input
                            type="date"
                            id="Data"
                            placeholder="Data de entrada"
                            className="form-control"
                            value={data}
                            onChange={(e) => setData(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Hora" className="form-label">Hora</label>
                        <input
                            type="time"
                            id="Hora"
                            placeholder="Hora de entrada"
                            className="form-control"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)} />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="Cliente" className="form-label">Nome</label>
                        <select
                            name="nome"
                            id="nome"
                            className="form-select"
                            onChange={(e) =>
                                setCliente({ id: Number.parseInt(e.target.value) })
                            }
                        >
                            <option value="DEFAULT">{id ? cliente.nome : 'Escolha um cliente'}</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit"
                        className="btn btn-primary"
                        onClick={(e) => criarOuEditarDestino(e)}>
                        Enviar
                    </button>
                    <Link
                        to="/destinos"
                        className="btn btn-danger"
                        style={{ marginLeft: "10px" }}
                    >
                        Cancelar
                    </Link>
                </fieldset>
            </form>
        </div>
    )

}