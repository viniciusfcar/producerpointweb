import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import './CadastroActivity.css';

import api from '../../services/api'

function CadastroActivity() {

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

    let { id } = useParams();
    const [value, setValue] = useState(null);
    const [label, setLabel] = useState('');
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState('');

    const getActivity = async (id) => {
        const request = await api.getActivity(id)
        const response = await request.json();
        setValue(response.value);
        setLabel(response.label);
    }
    
    useEffect(() => {
        if(id > 0) {
            getActivity(id);
        } 
    }, [])

    const onLabel = (evento) => {
        setLabel(evento.target.value);
    }

    const closeModal = () => {
        setModal(false);
    }

    const validaForm = (e) => {
        if(label == "" ) {
            setMsgModal("Nome da atividade é de preenchimento obrigatório!");
            setModal(true);
        } else {
            handleSubmit(e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await api.updateActivity(value, label);

        if(response != null && response.status >= 200 && response.status <= 205) {
            setMsgModal('Atividade gravada com sucesso.');
            setModal(true);
            
        } else {
            setMsgModal('Erro inesperado, tente novamente ou contate o suporte. Status = '+response.status);
            setModal(true);
        }
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
                    <h3>Cadastro Atividade</h3>
                </div>
            </nav>
            <div className="container">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" value={label} onChange={onLabel} required />
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-outline-success m-2">Salvar</button>
                        <a href='/lista-activities' class="btn btn-outline-primary m-2">Voltar</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroActivity;