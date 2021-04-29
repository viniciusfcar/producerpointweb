import React, {useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';

import './CadastroProduct.css';

function CadastroProduct() {

    const [label, setLabel] = useState('');
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

    const onLabel = (evento) => {
        setLabel(evento.target.value);
    }

    const closeModal = () => {
        setModal(false);
    }

    const onCadastroProduto = async () => {
        
        const body = {label: label}
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        
        const response = await request.json();

        if(response != null) {
            setMsgModal('Produto cadastrado com sucesso.');
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
                    <h3>Cadastro Produto</h3>
                </div>
            </nav>
            <div className="container">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" onChange={onLabel} required />
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary" onClick={onCadastroProduto}>Cadastrar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroProduct;