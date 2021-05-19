import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';
import Navbar from '../../components/NavBar/Navbar.js';
import { useParams } from "react-router-dom";
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

import './style.css';
import api from '../../services/api.js';

function DetalhesManager(params) {
    
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
    const [created, setCreated] = useState("");
    const [address, setAddress] = useState({});
    const [farmingActivity, setFarmingActivity] = useState({});
    const [products, setProducts] = useState([]);

    const getManager = async (id) => {
        const request = await api.getManager(id);
        const response = await request.json();
        setVars(response);
    }

    const setVars = async (manager) => {
        id = manager.id;
        setName(manager.name);
        setNickname(manager.nickname);
        setPhone(manager.phone);
        setEmail(manager.email);
        setCpf(manager.cpf);
        setStatus(manager.status);
        setRole(manager.role);
        setBirthDate(manager.birthDate);
        setCreated(manager.created);
        setAddress(manager.address);
        setProducts(manager.products);
        await setFarmingActivity(manager.farmingActivity);
        
    }

    useEffect(() => {
        getManager(id);
    }, [])
    
    return(
        <>
            <Navbar/>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Detalhes do Usuário</h3>
                </div>
            </nav>
            <div className="container">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="alert alert-dark" role="alert">
                                    <h4>Dados Pessoais</h4>
                                </div>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">CPF</th>
                                            <th scope="col">Data de Nascimento</th>
                                            <th scope="col">Data do Cadatramento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{name}</td>
                                            <td>{cpf}</td>
                                            <td><input type='date' class="border-0 m-0" value={birthDate} disabled={true}/></td>
                                            <td><input type='date' class="border-0 m-0" value={created} disabled={true}/></td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th scope="col">Nick Name</th>
                                            <th scope="col">Telefone</th>
                                            <th scope="col">E-mail</th>
                                            <th scope="col">Perfil</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{nickname}</td>
                                            <td><a href={`tel:${phone}`}>{phone}</a></td>
                                            <td><a href={`mailto:${email}`}>{email}</a></td>
                                            <td>{role === 0 ? "Administrador" : "Técnico"}</td>
                                        </tr>
                                    </tbody>                        
                                </table>
                            </div>
                        </div>
                        <div className="btn-back">
                            <a href={`/cadastro-manager/${id}`} class="btn btn-outline-warning m-2" role="button" aria-pressed="true">Editar</a>
                            <a href="/lista-managers" class="btn btn-outline-primary m-2" role="button" aria-pressed="true">Voltar</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetalhesManager;