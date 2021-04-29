import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';
import Navbar from '../../components/NavBar/Navbar.js';
const FilterableTable = require('react-filterable-table');

function ListaProducers(params) {
    
    const [producers, setProducers] = useState([]);
    const [andress, setAndress] = useState([]);

    const getProducers = async () => {
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/producers', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        
        const response = await request.json();
        setProducers(response);
    }

    useEffect(() => {
        getProducers();
    }, [])
    
    return(
        <>
            <Navbar/>
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
                                            { name: 'address.street', displayName: "Logradouro", inputFilterable: true, exactFilterable: true, sortable: true },
                                            { name: 'address.houseNumber', displayName: "Número", inputFilterable: true, exactFilterable: true, sortable: true },
                                            { name: 'address.reference', displayName: "Complemento", inputFilterable: true, exactFilterable: true, sortable: true },
                                            { name: 'address.district', displayName: "Bairro", inputFilterable: true, exactFilterable: true, sortable: true },
                                            { name: 'address.city', displayName: "Cidade", inputFilterable: true, exactFilterable: true, sortable: true },
                                            { name: 'address.uf', displayName: "Estado", inputFilterable: true, exactFilterable: true, sortable: true },
                                            { name: 'address.zipCode', displayName: "CEP", inputFilterable: true, exactFilterable: true, sortable: true }
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