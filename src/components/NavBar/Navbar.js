import React, {useEffect, useState, useContext} from 'react';

import './Navbar.css';

const Navbar = () => {

    return(
        <>
            <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: 'green'}}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#" style={{color: 'orange'}}>ProducerPoint</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="/Home" style={{color: 'orange'}}>Home</a>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" style={{color: 'orange'}} href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Cadastro
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="/cadastro-producer">Produtor</a></li>
                                <li><a class="dropdown-item" href="/cadastro-product">Produto</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" style={{color: 'orange'}} href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Listar
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="/lista-producers">Produtores</a></li>
                                <li><a class="dropdown-item" href="/lista-products">Produtos</a></li>
                            </ul>
                        </li>
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true" style={{color: 'orange'}}>Sair</a>
                    </div>
                    </div>
                </div>
            </nav>
        </> 
    );
}

export default Navbar;