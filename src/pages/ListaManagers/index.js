import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';

import api from '../../services/api.js';

const FilterableTable = require('react-filterable-table');

function ListaManagers(params) {

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
    
    //Key para setar o id do managers no modal
    const [key, setKey] = useState(null);
    const [managers, setManagers] = useState([]);

    //Variáveis Modal
    const [modalConfirm, setModalConfirm] = useState(false);
    const [msgModal, setMsgModal] = useState('');
    const [okModal, setOkModal] = useState(null);
    const [modal, setModal] = useState(false);

    const geraLink = (manager) => {
        return (
            <div class="btn-group btn-group" role="group">
                <a href={"/detalhes-Manager/"+manager.id} class="btn btn-sm btn-outline-success m-2">Detalhes</a>
                <a href={"/cadastro-manager/"+manager.id} class="btn btn-sm btn-outline-warning m-2">Editar</a>
                <button class="btn btn-outline-danger btn-sm m-2" onClick={(id) => deleteConfirm(manager.id, id)}>Excluir</button>
            </div>
        )
    }

    const getManagers = async () => {
        const request = await api.getAllManagers();
        const response = request.status == 200 ?
                            await request.json() :
                            []
        response.map(function (p) {
            p.links=geraLink(p);
            p.perfil= p.role === 0 ? 'Administrador' : 'Técnico';
        })
        setManagers(response);
    }

    const deleteConfirm = (id) => {
        setKey(id)
        setMsgModal('Tem certeza que deseja excluir o Produtor? '+key);
        setModalConfirm(true);
    }

    const deleteManager = async () => {
        setModalConfirm(false);
        const request = await api.deleteManager(key);
        getManagers();
        if(await request.status == 200){
            setMsgModal('Produtor excluido com sucesso.');
        } else {
            setMsgModal('Erro '+request.status);
        }
        setModal(true);
    }

    useEffect(() => {
        getManagers();
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
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={deleteManager}>Excluir</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {setModalConfirm(false)}}>Cancelar</button>
                </div>
            </Modal>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Lista dos Usuários</h3>
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
                                    data={managers}
                                    fields={
                                        [
                                            { name: 'name', displayName: "Nome", inputFilterable: true, sortable: true },
                                            { name: 'perfil', displayName: "Perfil", inputFilterable: true, sortable: true },
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

export default ListaManagers;