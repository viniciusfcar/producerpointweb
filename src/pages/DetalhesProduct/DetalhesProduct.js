import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';
import Navbar from '../../components/NavBar/Navbar.js';
import { useParams } from "react-router-dom";
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

import './DetalhesProduct.css';
import api from '../../services/api'

function DetalhesProduct(params) {
    

    //variáveis do produto
    let { id } = useParams();
    const [label, setLabel] = useState("");
    const [producers, setProducers] = useState([]);

    const getProduct = async (value) => {
        const request = await api.getProduct(value)
        const response = await request.json();   
        setVars(response);
    }

    const getProducers = async (value) => {
        const request = await api.getProducersFromProduct(value)
        const response = await request.json();   
        console.log(response)
        setProducers(response);
    }

    const setVars = async (product) => {
        id = product.value;
        setLabel(product.label);
    }

    useEffect(() => {
        getProduct(id);
        getProducers(id);
    }, [])
    
    return(
        <>
            <Navbar/>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Detalhes Produto</h3>
                </div>
            </nav>
            <div className="container">
                <div class="row">
                    <div class="col-12">
                        <div class="card-body">
                            <div class="alert alert-secondary" role="alert">
                                <h4>Dados do Produto</h4>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{id}</td>
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
                                            <td>{producer.email}</td>
                                            <td>{producer.phone}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                        </div>
                        <div className="btn-back">
                        <a href="/lista-products" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Voltar</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetalhesProduct;