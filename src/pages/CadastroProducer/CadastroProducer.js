import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import './CadastroProducer.css';

function CadastroProducer() {
    let { id } = useParams();
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [status, setStatus] = useState("");
    const [role, setRole] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState({});
    const [products, setProducts] = useState([]);
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState([]);
    const [productList, setProductList] = useState([]);

    const getProducer = async (id) => {
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/producers/'+id)
        const response = await request.json();  
        setName(response.name);
        setNickname(response.nickname);
        setPhone(response.phone);
        setEmail(response.email);
        setCpf(response.cpf);
        setStatus(response.status);
        setRole(response.role);
        setBirthDate(response.birthDate);
        setAddress(response.address);
        setProducts(response.products);
        setActivity(response.farmingActivity);
    }
    
    useEffect(() => {
        if(id > 0) {
            getProducer(id);
        } 
        getProducts();
        getFarmingActivities();
    }, [])

    const getProducts = async () => {
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/products', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        
        const response = await request.json();

        setProductList(response);
    }

    const getFarmingActivities = async () => {
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/farming-activities', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        
        const response = await request.json();

        setActivities(response);
    }

    const onChange= (event) =>{

    }

    const handleChange = (event) => {
        setActivity(event.target.value);
    }

    const handleInput = (event) => {
        setProducts(...products, event.target.value);

        console.log(products);
    }

    return(
        <>
            <Navbar/>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Cadastro Produtor</h3>
                </div>
            </nav>
            <div className="container">
                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="nickname" class="form-label">Nick Name</label>
                        <input type="email" class="form-control" id="nickname" onChange={function (event) {setNickname(event.target.value)}} value={nickname}/>
                    </div>
                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password"/>
                    </div>
                    <div class="col-12">
                        <label for="password" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="kame" placeholder="Ex: João de Oliveira" onChange={function (event) {setName(event.target.value)}} value={name}/>
                    </div>
                    <div class="col-12">
                        <label for="email" class="form-label">E-mail</label>
                        <input type="email" class="form-control" id="email" placeholder="Ex: joao@gmail.com" onChange={function (event) {setEmail(event.target.value)}} value={email}/>
                    </div>
                    <div class="col-md-2">
                        <label for="phone" class="form-label">Telefone</label>
                        <input type="text" class="form-control" id="phone" onChange={function (event) {setPhone(event.target.value)}} value={phone}/>
                    </div>
                    <div class="col-md-2">
                        <label for="cpf" class="form-label">CPF</label>
                        <input type="text" class="form-control" id="cpf" onChange={function (event) {setCpf(event.target.value)}} value={cpf}/>
                    </div>
                    <div class="col-md-2">
                        <label for="birthDate" class="form-label">Data de Nascimento</label>
                        <input type="date" class="form-control" id="birthDate" onChange={function (event) {setBirthDate(event.target.value)}} value={birthDate}/>
                    </div>
                    <div class="row g-2">
                        <div class="col-md-2">
                            <label for="zipCode" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="zipCode" onChange={function (event) {var a  = address; a.zipCode = event.target.value; setAddress(a)}} value={address.zipCode}/>
                        </div>
                        <div class="col-md-6">
                            <label for="street" class="form-label">Logradouro</label>
                            <input type="text" class="form-control" id="street" value={address.street}/>
                        </div>
                        <div class="col-md-2">
                            <label for="houseNumber" class="form-label">Número</label>
                            <input type="text" class="form-control" id="houseNumber" value={address.houseNumber}/>
                        </div>
                        <div class="col-md-6">
                            <label for="reference" class="form-label">Complemento</label>
                            <input type="text" class="form-control" id="reference" value={address.reference}/>
                        </div>
                        <div class="col-md-6">
                            <label for="district" class="form-label">Bairro</label>
                            <input type="text" class="form-control" id="district" value={address.district}/>
                        </div>
                        <div class="col-md-6">
                            <label for="city" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="city" value={address.city}/>
                        </div>
                        <div class="col-md-4">
                            <label for="uf" class="form-label">Estado</label>
                            <select id="uf" class="form-select">
                            <option value="" selected={address.uf=="" ? true : false}>Selecione</option>
                            <option value="RN" selected={address.uf=="RN" ? true : false}>RN</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-4">
                        <label for="inputState" class="form-label">Atividade Agrícola</label>
                        <select id="inputState" class="form-select" onChange={handleChange}>
                            <option selected>Selecione</option>
                            {activities.map((activity) => (
                                <option key={activity.id}>{activity.activityName}</option>
                            ))}
                        </select>
                    </div>
                    <label for="inputState" class="form-label">Produtos</label>
                    {products.map((product) => (
                        <div class="form-check">
                            <input key={product.id} class="form-check-input" type="checkbox" value={product.id} onChange={handleInput} id="flexCheckChecked"/>
                            <label class="form-check-label" for="flexCheckChecked">
                                {product.label}
                            </label>
                        </div>
                    ))}
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CadastroProducer;