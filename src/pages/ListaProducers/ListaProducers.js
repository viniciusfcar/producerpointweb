import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';

import api from '../../services/api.js';

const FilterableTable = require('react-filterable-table');

function ListaProducers(params) {

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
    
    //Key para setar o id do produtor no modal para
    const [key, setKey] = useState(null);
    const [producers, setProducers] = useState([]);
    const [andress, setAndress] = useState([]);

    //Variáveis Modal
    const [modalConfirm, setModalConfirm] = useState(false);
    const [msgModal, setMsgModal] = useState('');
    const [modal, setModal] = useState(false);

    const geraLink = (producer) => {
        return (
            <div class="btn-group btn-group" role="group">
                <a href={"/detalhes-producer/"+producer.id} class="btn btn-sm btn-outline-success m-2">Detalhes</a>
                <a href={"https://apiproducers.serviceapp.net.br/api/producers/"+producer.id+"/pdf/1"} target="_new" class="btn btn-sm btn-outline-info m-2">PDF</a>
                <a href={"/cadastro-producer/"+producer.id} class="btn btn-sm btn-outline-warning m-2">Editar</a>
                <button class="btn btn-outline-danger btn-sm m-2" onClick={(id) => deleteConfirm(producer.id, id)}>Excluir</button>
            </div>
        )
    }

    const getProducers = async () => {
        const request = await api.getAllProducers();
        
        const response = await request.json();
        response.map(function (p) {
            p.links=geraLink(p)
        })
        setProducers(response);
    }

    const deleteConfirm = (id) => {
        setKey(id)
        setMsgModal('Tem certeza que deseja excluir o Produtor?');
        setModalConfirm(true);
    }

    const deleteProducer = async () => {
        setModalConfirm(false);

        const request = await fetch('https://apiproducers.serviceapp.net.br/api/producers/'+key, {
            method: 'DELETE'
        })
        if(request.status == 200){
            setMsgModal('Produtor excluido com sucesso.');
        } else {
            setMsgModal('Erro '+request.status);
        }
        setModal(true);
        getProducers();
    }

    useEffect(() => {
        getProducers();
    }, [])
    
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
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {setModal(false)}}>Fechar</button>
                </div>
            </Modal>
            <Modal 
                isOpen={modalConfirm}
                style={customStyles}
            >
                <div class="modal-body">
                    <p>{msgModal}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={deleteProducer}>Excluir</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {setModalConfirm(false)}}>Cancelar</button>
                </div>
            </Modal>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Lista dos Produtores</h3>
                </div>
            </nav>
            <div className="container">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h3>Filtrar</h3>
                                <FilterableTable
                                    namespace="People"
                                    initialSort="name"
                                    data={producers}
                                    fields={
                                        [
                                            { name: 'name', displayName: "Nome", inputFilterable: true, sortable: true },
                                            { name: 'cpf', displayName: "CPF", inputFilterable: true, exactFilterable: true, sortable: true },
                                            { name: 'email', displayName: "E-mail", inputFilterable: true, exactFilterable: true, sortable: true },
                                            { name: 'phone', displayName: "Telefone", inputFilterable: true, exactFilterable: true, sortable: true },
                                            { name: 'links', displayName: "Links", inputFilterable: false, sortable: false },
                                        ]
                                    }
                                    noRecordsMessage={<h3 style={{color : 'red'}}>Nenhum item para exibir!</h3>}
                                    noFilteredRecordsMessage={<h3 style={{color : 'red'}}>Nenhum resultado para este filtro!</h3>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaProducers;