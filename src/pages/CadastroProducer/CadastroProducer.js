import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import './CadastroProducer.css';
import { Alert } from 'react-bootstrap';

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

    //variáveis do Modal
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState('');

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
    
    //variáveis do Endereço
    const [uf, setUf]  = useState();
    const [city, setCity]  = useState();
    const [zipCode, setZipCode]  = useState();
    const [district, setDistrict]  = useState();
    const [street, setStrret]  = useState();
    const [houseNamber, setHousenamber]  = useState();
    const [reference, setReference]  = useState();
    
    //variáveis da atividade
    const [activityName, setActivityName] = useState('');
    const [period, setPeriod] = useState('');
    const [averageCash, setCash] = useState('');

    //variáveis do produto
    const [productList, setProductList] = useState([]);

    
    //recupera dados do produtor na API
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

    //recupera lista de produtos na API
    const getProducts = async () => {
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/products', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }); 
        const response = await request.json();
        setProductList(response);
    }
    
    //carrega dados da API
    useEffect(() => {
        if(id > 0) {
            //dados do produtor
            getProducer(id);
        } 
        //lista de produtos
        getProducts();
    }, [])

    //fecha caixa de diálogo modal
    const closeModal = () => {
        setModal(false);
    }

    //valida formulário antes do envio
    const validaForm = () => {
        if(
            name == '' || nickname == '' || phone == '' || 
            email == '' ||  cpf == '' || birthDate == '' 
        ) {
            setMsgModal('Preenchha os campos obrigatórios marcado com *');
            setModal(true);
        } else {
            onCadastroProducer();
        }   
    }

    //salva dados para a API
    const onCadastroProducer = async () => {
        const body = {
            name: name,
            nickname, nickname,
            phone: phone, 
            email: email,
            cpf: cpf, 
            status: status, 
            role: role,
            birthDate: birthDate,
            address: {
                zipCode : address.zipCode,
                city : address.city,
                uf : address.uf,
                district : address.district,
                street : address.street,
                houseNambe : address.houseNamber,
                reference : address.reference
            },
            farmingActivity: {
                activityName : farmingActivity.activityName,
                period : farmingActivity.period,
                averageCash : farmingActivity.averageCash
            },
            products: products,
            manager : {
                id : 1
            }
        }
        
        let url = 'https://apiproducers.serviceapp.net.br/api/producers';
        let method = 'POST';

        if(id>0){body.id=id;method = 'POST'}

        console.log(JSON.stringify(body))
        
        const request = await fetch(url, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Acept' : 'application/json'
            },
            body: JSON.stringify(body)
        })
        
        const response = await request.json();
        
        if(response != null) {
            if(request.status >= 200 && request.status < 205){
                setMsgModal('Produtor cadastrado com sucesso.');
                setVars(response);
            } else {
                setMsgModal('Erro '+request.status);
            }
            setModal(true);
        } else {
            setMsgModal('Erro inesperado, tente novamente ou contate o suporte.');
            setModal(true);
        }
    }

    const addProduct = async (event) => {
        setProducts([...products, await JSON.parse(event.target.value)])
    }

    const removeProduct = async (value) => {
        setProducts(products.filter(p => p.value !== value));
    }

    return(
        <>
            <Navbar/>
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
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Cadastro Produtor</h3>
                </div>
            </nav>
            <div className="container">
                <form class="row g-3">
                    <div class="col-md-2">
                        <label for="nickname" class="form-label">ID#</label>
                        <span class="form-control">{id}</span>
                    </div>
                    <div class="col-md-5">
                        <label for="nickname" class="form-label">Nick Name*</label>
                        <input type="email" class="form-control" id="nickname" onChange={function (event) {setNickname(event.target.value)}} value={nickname}/>
                    </div>
                    <div class="col-md-5">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password"/>
                    </div>
                    <div class="col-12">
                        <label for="password" class="form-label">Nome*</label>
                        <input type="text" class="form-control" id="kame" placeholder="Ex: João de Oliveira" onChange={function (event) {setName(event.target.value)}} value={name}/>
                    </div>
                    <div class="col-12">
                        <label for="email" class="form-label">E-mail*</label>
                        <input type="email" class="form-control" id="email" placeholder="Ex: joao@gmail.com" onChange={function (event) {setEmail(event.target.value)}} value={email}/>
                    </div>
                    <div class="col-md-4">
                        <label for="phone" class="form-label">Telefone*</label>
                        <input type="text" class="form-control" id="phone" onChange={function (event) {setPhone(event.target.value)}} value={phone}/>
                    </div>
                    <div class="col-md-4">
                        <label for="cpf" class="form-label">CPF*</label>
                        <input type="text" class="form-control" id="cpf" onChange={function (event) {setCpf(event.target.value)}} value={cpf}/>
                    </div>
                    <div class="col-md-4">
                        <label for="birthDate" class="form-label">Data de Nascimento*</label>
                        <input type="date" class="form-control" id="birthDate" onChange={function (event) {setBirthDate(event.target.value)}} value={birthDate}/>{birthDate}
                    </div>
                    <div class="row g-2">
                        <div class="col-md-3">
                            <label for="zipCode" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="zipCode" onChange={async (event) => {var a = address; a.zipCode = event.target.value; await setAddress(a)}} value={address.zipCode}/>
                        </div>
                        <div class="col-md-7">
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
                        <div class="col-md-6">
                            <label for="uf" class="form-label">Estado</label>
                            <select id="uf" class="form-select">
                            <option value="" selected={address.uf=="" ? true : false}>Selecione</option>
                            <option value="RN" selected={address.uf=="RN" ? true : false}>RN</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-12 card">
                        <div class="col-12 card">
                            <label for="productList" class="form-label">Atividade Agrícola</label>
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">Nome</label>
                                    <select id="inputState" class="form-select" onChange={(evento) => {var a= farmingActivity; a.activityName = evento.target.value; setFarmingActivity(a)}}>
                                        <option value="" selected={farmingActivity.activityName=="" ? true : false}>Selecione</option>
                                        <option value="Agricultor" selected={farmingActivity.activityName=="Agricultor" ? true : false}>Agricultor</option>
                                        <option valur="Pescador" selected={farmingActivity.activityName=="Pescador" ? true : false}>Pescador</option>
                                        <option value="Apicultor" selected={farmingActivity.activityName=="Apicultor" ? true : false}>Apicultor</option>
                                        <option value="Leiteiro" selected={farmingActivity.activityName=="Leiteiro" ? true : false}>Leiteiro</option>
                                        <option value="Outra" selected={farmingActivity.activityName=="Trimestral" ? true : false}>Outra</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">Período</label>
                                    <select id="inputState" class="form-select" onChange={(evento) => {var a= farmingActivity; a.period = evento.target.value; setFarmingActivity(a)}}>
                                        <option value="" selected={farmingActivity.period=="" ? true : false}>Selecione</option>
                                        <option value="Diario" selected={farmingActivity.period=="Diario" ? true : false}>Diário</option>
                                        <option valur="Semanal" selected={farmingActivity.period=="Semanal" ? true : false}>Semanal</option>
                                        <option value="Quinzenal" selected={farmingActivity.period=="Quinzenal" ? true : false}>Quinzenal</option>
                                        <option value="Mensal" selected={farmingActivity.period=="Mensal" ? true : false}>Mensal</option>
                                        <option value="Trimestral" selected={farmingActivity.period=="Trimestral" ? true : false}>Trimestral</option>
                                        <option value="Semestral" selected={farmingActivity.period=="Semestral" ? true : false}>Semestral</option>
                                        <option value="Anual" selected={farmingActivity.period=="Anual" ? true : false}>Anual</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="averageCash" class="form-label">Ganho Médio</label>
                                    <input type="number" class="form-control" id="averageCash" value={farmingActivity.averageCash} onChange={(evento) => {var a= farmingActivity; a.averageCash = evento.target.value; setFarmingActivity(a)}} />
                                </div>
                            </div>
                        </div>
                        <div class="col-12 card">
                            <div class="col-4 card">
                                <label for="activityList" class="form-label">Adicionar Produto</label>
                                <select id="productList" class="form-select" onChange={addProduct}>
                                    <option value="" selected={name=="" ? true : false}>Selecione</option>
                                    {productList.map((product) => (
                                        <option value={JSON.stringify(product)}>{product.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="col-8" name={'#products'}>
                                <label for="inputState" class="form-label">Atividades Agrícolas Selecionadas</label>
                                    {products.map((product) => (
                                        <div class="row col-12">
                                            <div class="col">
                                                {product.value}
                                            </div>
                                            <div class="col">
                                                {product.label}
                                            </div>
                                            <div class="col">
                                                {<a href={'#product'} alt="Remover Atividade" onClick={() => removeProduct(product.value)}>X</a>}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>   
                    </div> 
                    <div class="col-6">
                        <button type="submit" class="btn btn-primary" onClick={validaForm}>Salvar</button>
                    </div>                    
                </form>
            </div>
        </>
    );
}
export default CadastroProducer;