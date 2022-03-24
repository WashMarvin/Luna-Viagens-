import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ClienteService from '../../services/ClienteService'
import DestinoService from '../../services/DestinoService'
import PacoteService from '../../services/PacoteService'

export default function ClienteCreate() {
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [destino, setDestino] = useState({ id: "", cidade: "" });
    const [destinos, setDestinos] = useState([]);
    const [pacote, setPacote] = useState({ id: "", nome: "" });
    const [pacotes, setPacotes] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

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
        getAllDestinos()
    }, []);

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

    const criarOuEditarCliente = (e) => {
        e.preventDefault();

        const cliente = { nome, endereco, email, cpf, telefone, destino, pacote };
        console.log(cliente);

        if (id) {
            ClienteService.updateCliente(id, cliente)
                .then((response) => {
                    navigate("/clientes");
                })
        } else {
            ClienteService.createCliente(cliente)
                .then((response) => {
                    navigate("/clientes")
                })
        }
    }

    useEffect(() => {
        function getClienteById() {
            if (id) {
                ClienteService.getClienteById(id).then((response) => {
                    setNome(response.data.nome);
                    setEndereco(response.data.endereco);
                    setEmail(response.data.email);
                    setCpf(response.data.cpf);
                    setTelefone(response.data.telefone);
                    setDestino({ id: response.data.id, cidade: response.data.cidade });
                    setPacote({ id: response.data.id, nome: response.data.nome });
                })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        getClienteById();
    }, [id]);

    return (
        <div className="container py-3">
            <form>
                <fieldset>
                    <legend>
                        <h2 className="text-center">{id ? "Editar Cliente" : "Cadastrar cliente"}</h2>
                    </legend>
                    <div className="form-group mb-3">
                        <label htmlFor="Nome" className="form-label">Nome completo</label>
                        <input
                            type="text"
                            id="Nome"
                            className="form-control"
                            placeholder="Nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Endereco" className="form-label">Endereço</label>
                        <input
                            type="text"
                            id="Endereco"
                            className="form-control"
                            placeholder="Digite seu endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Email" className="form-label">E-mail</label>
                        <input
                            type="email"
                            id="Email"
                            className="form-control"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Cpf" className="form-label">CPF</label>
                        <input
                            type="text"
                            id="Cpf"
                            className="form-control"
                            placeholder="Digite seu cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Telefone" className="form-label">Telefone</label>
                        <input
                            type="text"
                            id="Telefone"
                            maxLength= "14"
                            className="form-control"
                            placeholder="Seu telefone aqui"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Destino" className="form-label">Destino</label>
                        <select
                            name="Destino"
                            id="Destino"
                            className="form-select"
                            onChange={(e) =>
                                setDestino({ id: Number.parseInt(e.target.value) })}
                        >
                            <option value="DEFAULT">{id ? destino.cidade : "Escolha um destino"}</option>
                            {destinos.map((destino) => (
                                <option key={destino.id} value={destino.id}>
                                    {destino.cidade} {destino.estado}
                                </option>
                            ))}
                        </select>
                        <div className="form-group mb-3">
                            <label htmlFor="Pacote" className="form-label">Pacote</label>
                            <select
                                name="Pacote"
                                id="Pacote"
                                className="form-select"
                                onChange={(e) =>
                                    setPacote({ id: Number.parseInt(e.target.value) })
                                }
                            >
                                <option value="DEFAULT">{id ? pacote.nome : "Escolha um pacote"}</option>
                                {pacotes.map((pacote) => (
                                    <option key={pacote.id} value={pacote.id}>
                                        {pacote.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={(e) => criarOuEditarCliente(e)}>
                            Enviar
                        </button>
                        <Link
                        to="/clientes"
                        className="btn btn-danger"
                        style={{ marginLeft: "10px"}}
                        >
                        Cancelar
                        </Link>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
