import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';
import Navbar from '../../components/NavBar/Navbar.js';
import { useParams } from "react-router-dom";
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

import './DetalhesProducer.css';

function DetalhesProducer(params) {
    
    const [producers, setProducers] = useState([]);
    const [andress, setAndress] = useState([]);
    
    //variáveis do produtor
    let { id } = useParams();
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [status, setStatus] = useState(true);
    const [role, setRole] = useState(1);
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState({});
    const [farmingActivity, setFarmingActivity] = useState({});
    const [products, setProducts] = useState([]);

    const getProducer = async (id) => {
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/producers/'+id)
        const response = await request.json();
        
        setVars(response);
    }

    const setVars = async (producer) => {
        id = producer.id;
        setName(producer.name);
        setNickname(producer.nickname);
        setPhone(producer.phone);
        setEmail(producer.email);
        setCpf(producer.cpf);
        setStatus(producer.status);
        setRole(producer.role);
        setBirthDate(producer.birthDate);
        setAddress(producer.address);
        setProducts(producer.products);
        await setFarmingActivity(producer.farmingActivity);
        
    }

    useEffect(() => {
        getProducer(id);
    }, [])
    
    return(
        <>
            <Navbar/>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Detalhes Produtor</h3>
                </div>
            </nav>
            <div className="container">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="alert alert-secondary" role="alert">
                                    <h4>Dados Pessoais</h4>
                                </div>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Data de Nascimento</th>
                                            <th scope="col" colspan={2}>CPF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{name}</td>
                                            <td>{format(Date.parse(birthDate!='' ? birthDate : new Date()), 'dd/MM/yyyy')}</td>
                                            <td colspan={2}>{cpf}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th scope="col">Nick Name</th>
                                            <th scope="col">Telefone</th>
                                            <th scope="col" colspan={2}>E-mail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{nickname}</td>
                                            <td>{phone}</td>
                                            <td colspan={2}>{email}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th scope="col">Logradouro</th>
                                            <th scope="col">Número</th>
                                            <th scope="col" colspan={2}>Complemento</th>
                                            </tr>
                                        </thead>
                                    <tbody>
                                        <tr>    
                                            <td>{address.street}</td>
                                            <td>{address.houseNumber}</td>
                                            <td colspan={2}>{address.reference}</td>
                                            </tr>
                                        </tbody>
                                    <thead>
                                        <tr>
                                            <th scope="col">Bairro</th>
                                            <th scope="col">Cidade</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">CEP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{address.district}</td>
                                            <td>{address.city}</td>
                                            <td>{address.uf}</td>
                                            <td>{address.zipCode}</td>
                                        </tr>
                                    </tbody>                                    
                                </table>
                                <div class="alert alert-secondary" role="alert">
                                    <h4>Atividade Agrícola</h4>
                                </div>
                                <table class="table"> 
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Período</th>
                                            <th scope="col">Ganho Médio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{farmingActivity?.activityName?.label}</td>
                                            <td>{farmingActivity?.period}</td>
                                            <td>{farmingActivity?.averageCash}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="alert alert-secondary" role="alert">
                                    <h4>Produtos</h4>
                                </div>
                                <ul>
                                {products.map((product) =>
                                    <li><a href={`/detalhes-product/${product.value}`}>{product.label}</a></li>
                                )}
                                </ul>
                            </div>
                        </div>
                        <div className="btn-back">
                        <a href={`/cadastro-producer/${id}`} class="btn btn-warning btn-lg active" role="button" aria-pressed="true">Editar</a>
                        <a href="/lista-producers" class="btn btn-primary btn-lg active m-2" role="button" aria-pressed="true">Voltar</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetalhesProducer;