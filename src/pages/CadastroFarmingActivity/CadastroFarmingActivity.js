import React, {useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';

import './CadastroFarmingActivity.css';

function CadastroFarmingActivity() {

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

    const onCadastroAtividade = async () => {
        
        const body = {activityName: name, period: period, averageCash: cash}
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
                        <select id="inputState" class="form-select" onChange={onPeriod}>
                            <option selected>Selecione</option>
                            <option value="Agricultor">Agricultor</option>
                            <option valur="Pescador">Pescador</option>
                            <option value="Apicultor">Apicultor</option>
                            <option value="Leiteiro">Leiteiro</option>
                            <option value="Trimestral">Trimestral</option>
                            <option value="Outra">Outra</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="inputState" class="form-label">Período</label>
                        <select id="inputState" class="form-select" onChange={onPeriod}>
                            <option selected>Selecione</option>
                            <option value="Diario">Diário</option>
                            <option valur="Semanal">Semanal</option>
                            <option value="Quinzenal">Quinzenal</option>
                            <option value="Mensal">Mensal</option>
                            <option value="Trimestral">Trimestral</option>
                            <option value="Semestral">Semestral</option>
                            <option value="Anual">Anual</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">Ganho Médio</label>
                        <input type="number" class="form-control" id="averageCash" onChange={onCash} required />
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary" onClick={onCadastroAtividade}>Cadastrar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroFarmingActivity;