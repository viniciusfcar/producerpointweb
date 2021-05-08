import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import { activities, periods, ufs } from '../../enums'

const FilterableTable = require('react-filterable-table');

function ListaFarmingActivities() {

    const geraLink = (activity) => {
        return (
            <div class="btn-group btn-group-lg" role="group">
                <a href={"/detalhes-activity/"+activity.value} class="btn btn-success">Detalhes</a>
            </div>
        )
    }

    activities.map(function (a) {
        a.links=geraLink(a)
    })
    
    return(
        <>
            <Navbar/>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Lista das Atividades Agrícolas</h3>
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
                                            { name: 'value', displayName: "Nome", inputFilterable: true, sortable: true },
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

export default ListaFarmingActivities;