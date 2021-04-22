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
                        <a class="nav-link" href="/cadastro-producer" style={{color: 'orange'}}>Cadastro Produtor</a>
                        <a class="nav-link" href="/lista-producers" style={{color: 'orange'}}>Listar Produtores</a>
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true" style={{color: 'orange'}}>Sair</a>
                    </div>
                    </div>
                </div>
            </nav>
        </> 
    );
}

export default Navbar;