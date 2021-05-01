import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
const FilterableTable = require('react-filterable-table');

function ListaProducts(params) {
    
    const [products, setProducts] = useState([]);
    const [andress, setAndress] = useState([]);

    const geraLink = (product) => {
        return <a href={"/cadastro-product/"+product.value}>editar</a>
    }

    const getProducts = async () => {
        const request = await fetch('https://apiproducers.serviceapp.net.br/api/products', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        
        const response = await request.json();
        response.map(function (p) {
            p.links=geraLink(p)
        })
        setProducts(response);
    }

    useEffect(() => {
        getProducts();
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
                                    data={products}
                                    fields={
                                        [
                                            { name: 'value', displayName: "ID#", inputFilterable: true, sortable: true },
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

export default ListaProducts;