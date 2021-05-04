import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { useParams } from "react-router-dom";
import './CadastroProducer.css';
import { activities, periods, ufs } from '../../enums'
import Select from 'react-select'

import api from '../../services/api'

function CadastroProducer() {

    const customStyles = {
        content : {
          top                   : '30%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
    };

    // ambiente
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState('');

    // Producer
    let { id } = useParams();
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [status, setStatus] = useState("");
    const [role, setRole] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [activity, setActivity] = useState('');
    const [period, setPeriod] = useState('');
    const [products, setProducts] = useState([]);

    // Produtos
    const [productList, setProductList] = useState([]);
 
    // Address
    const [zipCode, setZipCode] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [street, setStreet] = useState('')
    const [uf, setUf] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [reference, setReference] = useState('')
    const [averageCash, setAverageCash] = useState();

    //recupera dados do produtor na API
    const getProducer = async (id) => {

        const request = await api.getAllProducers(id)
        const response = await request.json();
        setName(response.name);
        setNickname(response.nickname);
        setPhone(response.phone);
        setEmail(response.email);
        setCpf(response.cpf);
        setStatus(response.status);
        setRole(response.role);
        setBirthDate(Date.parse(response.birthDate,'yyyy-MM-dd'));

        setZipCode(response.address.zipCode)
        setCity(response.address.city)
        setStreet(response.address.street)
        setDistrict(response.address.district)
        setUf(response.address.uf)
        setHouseNumber(response.address.houseNumber)
        setReference(response.address.reference)

        setProducts([...response.products] || []);
        setActivity(response.farmingActivity.activityName);
        setPeriod(response.farmingActivity.period);
        setAverageCash(response.farmingActivity.averageCash)

    }

    //recupera lista de produtos na API
    const getProducts = async () => {
        const request = await api.getAllProducts()
        const response = await request.json();
        setProductList(response);
    }

    useEffect(() => {
        if (id > 0) {
            getProducer(id);
        }
        getProducts()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setBirthDate(Date.parse(birthDate));

        let response = await api.updateProducer(
            id, name, nickname, birthDate, phone, cpf, email, houseNumber, reference,
            averageCash, zipCode, city, district, uf, street, activity, resultList, period
        )

        if(response != null && response.status == 200) {
            setMsgModal('Produtor gravado com sucesso.');
        } else {
            setMsgModal('Erro inesperado, tente novamente ou contate o suporte. Status = '+response.status);
        }
        setModal(true);
    }

    const productsList = () => {
        const newArray = []
        for (let i of products) {
            const keys = Object.keys(i)
            for (let key of keys) {
                if (key === 'value') {
                    const obj = { value: i[key] }
                    newArray.push(obj)
                }
            }
        }
        return newArray
    }

    const closeModal = () => {
        setModal(false);
    }

    const resultList = productsList()

    return (
        <>
            <Navbar />
            <Modal 
                isOpen={modal}
                style={customStyles}
            >
                <div class="modal-body">
                    <p>{msgModal}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Fechar</button>
                </div>
            </Modal>
            <nav class="navbar" style={{ marginTop: 10, backgroundColor: 'lightgray' }}>
                <div class="container-fluid" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                    <h3>Cadastro Produtor</h3>
                </div>
            </nav>
            <div className="container">
                <form class="row g-3" onSubmit={handleSubmit}>
                <div class="col-md-2">
                        <label for="id" class="form-label">Apelido</label>
                        <span type="text" class="form-control" id="id">{id}</span>
                    </div>
                    <div class="col-10">
                        <label for="name" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="kame" placeholder="Ex: João de Oliveira" onChange={function (event) { setName(event.target.value) }} value={name} />
                    </div>
                    <div class="col-md-6">
                        <label for="nickname" class="form-label">Apelido</label>
                        <input type="text" class="form-control" id="nickname" onChange={function (event) { setNickname(event.target.value) }} value={nickname} />
                    </div>
                    <div class="col-6">
                        <label for="email" class="form-label">E-mail</label>
                        <input type="email" class="form-control" id="email" placeholder="Ex: joao@gmail.com" onChange={function (event) { setEmail(event.target.value) }} value={email} />
                    </div>
                    <div class="col-md-4">
                        <label for="phone" class="form-label">Telefone</label>
                        <input type="text" class="form-control" id="phone" onChange={function (event) { setPhone(event.target.value) }} value={phone} />
                    </div>
                    <div class="col-md-4">
                        <label for="cpf" class="form-label">CPF</label>
                        <input type="text" class="form-control" id="cpf" onChange={function (event) { setCpf(event.target.value) }} value={cpf} />
                    </div>
                    <div class="col-md-4">
                        <label for="birthDate" class="form-label">Data de Nascimento</label>{birthDate}
                        <input type="date" class="form-control" id="birthDate" onChange={function (event) { setBirthDate(event.target.value) }} value={Date.parse(birthDate)} />
                    </div>
                    <div class="row g-2">
                        <div class="col-md-3">
                            <label for="zipCode" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="zipCode" onChange={e => setZipCode(e.target.value)} value={zipCode} />
                        </div>
                        <div class="col-md-7">
                            <label for="street" class="form-label">Logradouro</label>
                            <input type="text" class="form-control" id="street" onChange={e => setStreet(e.target.value)} value={street} />
                        </div>
                        <div class="col-md-2">
                            <label for="houseNumber" class="form-label">Número</label>
                            <input type="text" class="form-control" id="houseNumber" onChange={e => setHouseNumber(e.target.value)} value={houseNumber} />
                        </div>
                        <div class="col-md-6">
                            <label for="reference" class="form-label">Complemento</label>
                            <input type="text" class="form-control" id="reference" onChange={e => setReference(e.target.value)} value={reference} />
                        </div>
                        <div class="col-md-6">
                            <label for="district" class="form-label">Bairro</label>
                            <input type="text" class="form-control" id="district" onChange={e => setDistrict(e.target.value)} value={district} />
                        </div>
                        <div class="col-md-8">
                            <label for="city" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="city" onChange={e => setCity(e.target.value)} value={city} />
                        </div>
                        <div class="col-md-4">
                            <label for="uf" class="form-label">Estado</label>
                            <select id="uf" class="form-select" onChange={e => setUf(e.target.value)} value={uf} >
                                <option selected>Selecione</option>
                                {ufs.map((i) => (
                                    <option key={i.value} value={i.value} selected={i.value==uf ? true : false}>{i.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <label for="inputState" class="form-label">Atividade Agrícola</label>
                        {activity.activityName}
                        <select id="inputState" class="form-select" onChange={e => setActivity(e.target.value)}>
                            <option selected>Selecione</option>
                            {activities.map((i) => (
                                <option key={i.value} value={i.value} selected={i.value==activity ? true : false}>{i.label}</option>
                            ))}
                        </select>
                    </div>

                    <div class="col-6">
                        <label for="inputState" class="form-label">Périodo da Renda</label>
                        <select id="inputState" class="form-select" onChange={e => setPeriod(e.target.value)}>
                            <option selected>Selecione</option>
                            {periods.map((i) => (
                                <option key={i.value} value={i.value} selected={i.value==period ? true : false}>{i.label}</option>
                            ))}
                        </select>
                    </div>

                    <label for="inputState" class="form-label">Selecione os Produtos</label>
                    <Select
                        options={productList}
                        value={products}
                        isMulti
                        onChange={(item) => setProducts(item)}
                    />

                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CadastroProducer;