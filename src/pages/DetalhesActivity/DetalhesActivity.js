import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';
import Navbar from '../../components/NavBar/Navbar.js';
import { useParams } from "react-router-dom";
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

import './DetalhesActivity.css';
import api from '../../services/api'

function DetalhesActivity(params) {
    
    //variáveis da atividade
    let { id } = useParams();
    const [label, setLabel] = useState("");
    const [producers, setProducers] = useState([]);

    const getActivity = async (value) => {
        const request = await api.getActivity(value)
        const response = await request.json();   
        setVars(response);
    }

    const getProducers = async (value) => {
        const request = await api.getProducersByActivity(value)
        const response = await request.json();   
        console.log(response)
        setProducers(response);
    }

    const setVars = async (activity) => {
        id = activity.value;
        setLabel(activity.label);
    }

    useEffect(() => {
        getActivity(id);
        getProducers(id);
    }, [])
    
    return(
        <>
            <Navbar/>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Detalhes Actividade</h3>
                </div>
            </nav>
            <div className="container">
                <div class="row">
                    <div class="col-12">
                        <div class="card-body">
                            <div class="alert alert-secondary" role="alert">
                                <h4>Dados da Atividade</h4>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{label}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="alert alert-secondary" role="alert">
                                <h4>Produtores</h4>
                            </div>
                            
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Telefone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {producers.map((producer) =>
                                        <tr>
                                            <td><a href={`/detalhes-producer/${producer.id}`}>{producer.name}</a></td>
                                            <td><a href={`mailto:${producer.email}`}>{producer.email}</a></td>
                                            <td><a href={`tel:${producer.phone}`}>{producer.phone}</a></td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                        </div>
                        <div className="btn-back">
                            <a href={`/cadastro-activity/${id}`} class="btn btn-outline-warning m-2" role="button" aria-pressed="true">Editar</a>
                            <a href="/lista-activities" class="btn btn-outline-primary m-2" role="button" aria-pressed="true">Voltar</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetalhesActivity;