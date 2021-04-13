import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';
import Navbar from '../../components/NavBar/Navbar.js';

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
            <div className="container">
                <h2>Lista de Produtores</h2>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    {producers.map((producer) => (                               
                                        <Table key={producer.id}>
                                            <thead>
                                                <tr>
                                                    <th>Nome</th>
                                                    <th>CPF</th>
                                                    <th>E-mail</th>
                                                    <th>Telefone</th>
                                                    <th>Rua</th>
                                                    <th>Número</th>
                                                    <th>Complemento</th>
                                                    <th>Bairro</th>
                                                    <th>Cidade</th>
                                                    <th>UF</th>
                                                    <th>CEP</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <td>{producer.name}</td>
                                                <td>{producer.cpf}</td>
                                                <td>{producer.email}</td>
                                                <td>{producer.phone}</td>
                                                <td>{producer.address.street}</td>
                                                <td>{producer.address.houseNumber}</td>
                                                <td>{producer.address.reference}</td>
                                                <td>{producer.address.district}</td>
                                                <td>{producer.address.city}</td>
                                                <td>{producer.address.uf}</td>
                                                <td>{producer.address.zipCode}</td>
                                            </tbody>
                                        </Table>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaProducers;