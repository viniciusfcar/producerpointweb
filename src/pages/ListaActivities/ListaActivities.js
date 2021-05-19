import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import Modal from 'react-modal';

import api from '../../services/api'

const FilterableTable = require('react-filterable-table');

function ListaActivities(params) {

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

    const [key, setKey] = useState(null);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [msgModal, setMsgModal] = useState('');
    const [modal, setModal] = useState(false);
    const [activities, setActivities] = useState([]);

    const geraLink = (activity) => {
        return (
            <div class="btn-group btn-group" role="group">
                <a href={"/detalhes-activity/"+activity.value} class="btn btn-sm btn-outline-success m-2">Detalhes</a>
                <a href={"/cadastro-activity/"+activity.value} class="btn btn-sm btn-outline-warning m-2">Editar</a>
                <button class="btn btn-sm btn-outline-danger m-2" onClick={(value) => deleteConfirm(activity.value, value)}>Excluir</button>
            </div>
        )
    }

    const getActivities = async () => {
        const request = await api.getAllActivities();        
        const response = request.status == 200 ?
                            await request.json() :
                            []
        response.map(function (a) {
            a.links=geraLink(a)
        })
        setActivities(response);
    }

    const deleteConfirm = (id) => {
        setKey(id)
        setMsgModal('Tem certeza que deseja excluir a Atividade?');
        setModalConfirm(true);
    }

    const deleteProduct = async () => {
        setModalConfirm(false);
        const request = await api.deleteActivity(key)
        getActivities();
        if(await request.status == 200){
            setMsgModal('Produto excluido com sucesso.');
        } else {
            setMsgModal('Erro '+request.status);
        }
        setModal(true);
    }

    useEffect(() => {
        getActivities();
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
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={deleteProduct}>Excluir</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {setModalConfirm(false)}}>Cancelar</button>
                </div>
            </Modal>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Lista de Atividades</h3> 
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
                                    data={activities}
                                    fields={
                                        [
                                            { name: 'value', displayName: "#ID", inputFilterable: true, sortable: true },
                                            { name: 'label', displayName: "Nome", inputFilterable: true, sortable: true },
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

export default ListaActivities;