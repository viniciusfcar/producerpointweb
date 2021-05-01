import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import './CadastroFarmingActivity.css';

function CadastroFarmingActivity() {
    let { id } = useParams();
    const [name, setName] = useState('');
    const [period, setPeriod] = useState('');
    const [cash, setCash] = useState('');
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState('');

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

    const getActivity = async (id) => {
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/farming-activities/'+id)
        const response = await request.json();  
        setName(response.activityName);
        setPeriod(response.period);
        setCash(response.averageCash)
    }
    
    useEffect(() => {
        if(id > 0) {
            getActivity(id);
        } 
    }, [])

    const onName = (evento) => {
        setName(evento.target.value);
    }

    const onPeriod = (evento) => {
        setPeriod(evento.target.value);
    }

    const onCash = (evento) => {
        setCash(evento.target.value);
    }

    const closeModal = () => {
        setModal(false);
    }

    const validaForm = () => {
        if(name == "" || period == "" || cash == "") {
            setMsgModal("Todos os campos são de preenchimento obrigatório!");
            setModal(true);
        } else {
            onCadastroAtividade();
        }
    }

    const onCadastroAtividade = async () => {
        
        const body = {activityName: name, period: period, averageCash: cash}
        if(id>0){body.id=id}
        console.log(JSON.stringify(body))
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/farming-activities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        
        const response = await request.json();
        
        if(response != null) {
            setMsgModal('Atividade Agrícola cadastrada com sucesso.');
            setModal(true);
        
        } else {
            setMsgModal('Erro inesperado, tente novamente ou contate o suporte.');
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
                    <h3>Cadastro Atividade Agrícola</h3>
                </div>
            </nav>
            <div className="container">
                <div class="row g-3">
                    <div class="col-md-4">
                        <label for="inputState" class="form-label">Nome</label>
                        <select id="inputState" class="form-select" onChange={onName}>
                            <option value="" selected={name=="" ? true : false}>Selecione</option>
                            <option value="Agricultor" selected={name=="Agricultor" ? true : false}>Agricultor</option>
                            <option valur="Pescador" selected={name=="Pescador" ? true : false}>Pescador</option>
                            <option value="Apicultor" selected={name=="Apicultor" ? true : false}>Apicultor</option>
                            <option value="Leiteiro" selected={name=="Leiteiro" ? true : false}>Leiteiro</option>
                            <option value="Outra" selected={name=="Trimestral" ? true : false}>Outra</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="inputState" class="form-label">Período</label>
                        <select id="inputState" class="form-select" onChange={onPeriod}>
                            <option value="" selected={period=="" ? true : false}>Selecione</option>
                            <option value="Diario" selected={period=="Diario" ? true : false}>Diário</option>
                            <option valur="Semanal" selected={period=="Semanal" ? true : false}>Semanal</option>
                            <option value="Quinzenal" selected={period=="Quinzenal" ? true : false}>Quinzenal</option>
                            <option value="Mensal" selected={period=="Mensal" ? true : false}>Mensal</option>
                            <option value="Trimestral" selected={period=="Trimestral" ? true : false}>Trimestral</option>
                            <option value="Semestral" selected={period=="Semestral" ? true : false}>Semestral</option>
                            <option value="Anual" selected={period=="Anual" ? true : false}>Anual</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="averageCash" class="form-label">Ganho Médio</label>
                        <input type="number" class="form-control" id="averageCash" value={cash} onChange={onCash} required />
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary" onClick={validaForm}>Cadastrar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroFarmingActivity;