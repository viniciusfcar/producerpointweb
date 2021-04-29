import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
const FilterableTable = require('react-filterable-table');

function ListaFarmingActivities(params) {
    
    const [activities, setActivities] = useState([]);
    const [andress, setAndress] = useState([]);

    const getActivities = async () => {
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/farming-activities', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        
        const response = await request.json();
        setActivities(response);
    }

    useEffect(() => {
        getActivities();
    }, [])
    
    return(
        <>
            <Navbar/>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Lista dos Produtos</h3>
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
                                            { name: 'activityName', displayName: "Nome", inputFilterable: true, sortable: true },
                                            { name: 'period', displayName: "Período", inputFilterable: true, sortable: true },
                                            { name: 'averageCash', displayName: "Ganho Médio", inputFilterable: true, sortable: true },
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

export default ListaFarmingActivities;