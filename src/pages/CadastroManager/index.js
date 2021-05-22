import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import './style.css';

import { AuthContext } from '../../components/Context/AuthContext.js';

import api from '../../services/api'
import CPF from '../../services/cpf'

function CadastroManager() {

    const {user} =  useContext(AuthContext);

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
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modal, setModal] = useState(false);
    const [okModal, setOkModal] = useState(null);
    const [msgModal, setMsgModal] = useState([]);
    const [newRole, setNewRole] = useState(null);

    // Manager
    let { id } = useParams();
    const [mid, setId] = useState(id);
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [status, setStatus] = useState("");
    const [role, setRole] = useState(1);
    const [birthDate, setBirthDate] = useState(Date());

    //recupera dados do produtor na API
    const getManager = async (id) => {

        const request = await api.getManager(id)
        const response = await request.json();
        setName(response.name);
        setNickname(response.nickname);
        setPhone(response.phone);
        setEmail(response.email);
        setCpf(response.cpf);
        setStatus(response.status);
        setRole(response.role);
        setBirthDate(response.birthDate?.substr(0,10));

    }

    const getManagerByEmail = async (email) => {
        let request = await api.getManagerByEmail(email);
        if(request?.status === 200){
            let response = await request.json();
            if(response.id != mid) {
                return false
            }
            console.log(mid, response.id);
        }
        
        return true;
    }

    useEffect(() => {
        if (id > 0) {
            getManager(id);
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validaCPF = await CPF.validaCPF(cpf);
        let validaEmail = await getManagerByEmail(email);
        if(name=='' || nickname =='' || birthDate=='' || phone==''
        || email=='' || validaCPF === false  || validaEmail == false  ){
            let mess = [];
            await mess.push('Preencha todos os campos marcaods com *.');
            if (await validaEmail === false){
                await mess.push('O e-mail informado já existe para outro usuário!');
            }
            if(await CPF.validaCPF(cpf)===false){
                await mess.push('O CFP digitado é inválido!!');
            } 
            await setMsgModal(mess);
        } else {
            setBirthDate(Date.parse(birthDate));

            let request = await api.updateManager(
                mid, name, nickname, birthDate, phone, cpf, email, role
            )
    
            if(request != null && request.status >= 200 && request.status <= 205) {
                const response = await request.json();
                setMsgModal(['Usuário gravado com sucesso.']);
                setId(await response.id);
            } else {
                setMsgModal(['Erro inesperado, tente novamente ou contate o suporte. Status = '+request?.status]);
            }
        }
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const confirmPerfil = (perfil) => {
        const perfis = ['Administrador', 'Técnico']
        if(perfil != role) {
            setMsgModal([`Tem certeza que deseja alterar o perfil deste usuário para ${perfis[perfil]}?`]);
            setNewRole(perfil);
            setModalConfirm(true);
        }
    }

    const changePerfil = () => {
        setRole(newRole);
        setModalConfirm(false);
    }

    return (
        <>
            <Navbar />
            <Modal 
                isOpen={modal}
                style={customStyles}
            >
                <div class="modal-body">
                    <p>{msgModal?.map(m =><p>{m}</p>)}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Fechar</button>
                </div>
            </Modal>
            <Modal 
                isOpen={modalConfirm}
                style={customStyles}
            >
                <div class="modal-body">
                    <p>{msgModal?.map(m =><p>{m}</p>)}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={changePerfil}>Alterar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {setModalConfirm(false)}}>Cancelar</button>
                </div>
            </Modal>
            <nav class="navbar" style={{ marginTop: 10, backgroundColor: 'lightgray' }}>
                <div class="container-fluid" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                    <h3>Cadastro de Usuário</h3>
                </div>
            </nav>
            <div className="container">
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-md-2">
                        <label for="id" class="form-label">ID#</label>
                        <span type="text" class="form-control" id="id">{mid}</span>
                    </div>
                    <div class="col-10">
                        <label for="name" class="form-label">Nome*</label>
                        <input type="text" class="form-control" id="kame" placeholder="Ex: João de Oliveira" onChange={function (event) { setName(event.target.value) }} value={name} />
                    </div>
                    <div class="col-md-6">
                        <label for="nickname" class="form-label">Apelido*</label>
                        <input type="text" class="form-control" id="nickname" onChange={function (event) { setNickname(event.target.value) }} value={nickname} />
                    </div>
                    <div class="col-6">
                        <label for="email" class="form-label">E-mail*</label>
                        <input type="email" class="form-control" id="email" placeholder="Ex: joao@gmail.com" onChange={function (event) { setEmail(event.target.value) }} value={email} />
                    </div>
                    <div class="col-md-3">
                        <label for="phone" class="form-label">Telefone*</label>
                        <input type="text" class="form-control" id="phone" onChange={ async function (event) { await setPhone(await CPF.phoneMask(event.target.value) ) }} value={phone} />
                    </div>
                    <div class="col-md-3">
                        <label for="cpf" class="form-label">CPF*</label>
                        <input type="text" class="form-control" id="cpf" onChange={ async function (event) { await setCpf(await CPF.cpfMask(event.target.value)) }}  value={cpf} />
                    </div>
                    <div class="col-md-3">
                        <label for="birthDate" class="form-label">Data de Nascimento*</label>
                        <input type="date" class="form-control" id="birthDate" onChange={function (event) { setBirthDate(event.target.value) }} value={birthDate} />
                    </div>
                    <div class="col-md-3">
                        <label for="role" class="form-label">Perfil*</label>
                        <select class="form-select" id="role"  value={role} onChange={function (event) { confirmPerfil(event.target.value) }} value={role} >
                            <option value={0} selected={role === 0 ? true : false}>Administrador</option>
                            <option value={1} selected={role === 1 ? true : false}>Técnico</option>
                        </select>
                    </div>
                   
                    <div class="col-12">
                        <button type="submit" class="btn btn-outline-success m-2">Salvar</button>
                        <a href='/lista-managers' class="btn btn-outline-primary m-2">Voltar</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CadastroManager;