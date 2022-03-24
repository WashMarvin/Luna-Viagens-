import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PacoteService from '../../services/PacoteService'

export default function Create() {
    const [nome, setNome] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [hotel, setHotel] = useState("");
    const [periodo, setPeriodo] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const criarOuEditarPacote = (e) => {
        e.preventDefault();

        const pacote = { nome, cidade, estado, hotel, periodo }

        if(id) {
            PacoteService.updatePacote(id, pacote)
            .then((response) => {
                navigate("/pacotes");
            })

        } else {
            PacoteService.createPacote(pacote)
            .then((response) => {
                navigate("/pacotes");
            })
        }        
    }

    useEffect(() => {
        function getPacoteById() {
            if (id) {
                PacoteService.getPacoteById(id)
                    .then((response) => {
                        setNome(response.data.nome);
                        setCidade(response.data.cidade);
                        setEstado(response.data.estado);
                        setHotel(response.data.hotel);
                        setPeriodo(response.data.periodo);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        getPacoteById()
    }, [id])

    return (
        <div className='container py-3'>
            <form>
                <fieldset>
                    <legend>
                        <h2 className='text-center'>{id ? "Alterar pacote" : "Criar Pacote"}</h2>
                    </legend>
                    <div className="mb-3">
                        <label htmlFor="Nome" className='form-label'>Nome</label>
                        <input type="text"
                            id='Nome'
                            className='form-control'
                            placeholder='Nome do pacote'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <div className="col-8">
                            <label htmlFor="Cidade" className='form-label'>Cidade de destino</label>
                            <input type="text"
                                id='Cidade'
                                className='form-control'
                                placeholder='Cidade de destino'
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="Estado" className='form-label'>Estado</label>
                            <input type="text"
                                id='Estado'
                                className='form-control'
                                placeholder='Estado'
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="col-8">
                            <label htmlFor="Hotel" className='form-label'>Hotel</label>
                            <input type="text"
                                id='Hotel'
                                className='form-control'
                                placeholder='Hotel'
                                value={hotel}
                                onChange={(e) => setHotel(e.target.value)} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="Periodo" className='form-label'>Período (dias)</label>
                            <input type="text"
                                id='Periodo'
                                className='form-control'
                                placeholder='Período (dias)'
                                value={periodo}
                                onChange={(e) => setPeriodo(e.target.value)} />
                        </div>
                    </div>
                        <button type='submit'
                        className='btn btn-primary'
                        onClick={(e) => criarOuEditarPacote(e)}
                        >Enviar
                        </button>
                        <Link
                        to='/Pacotes'
                        className='btn btn-danger'
                        style={{ marginLeft: "10px"}}
                        >Cancelar
                        </Link>
                </fieldset>
            </form>
        </div>
    )
}
