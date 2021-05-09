import React, {useEffect, useState, useContext} from 'react';
import logo from '../../imagens/logo.png';
import './Navbar.css';

import { doLogout } from '../../services/auth'

const Navbar = () => {

    const handleLogout = () => {
        doLogout()
        window.location.href = '/'
    }

    return(
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <div class="container-fluid">
                    <img src={logo} style={{height : '48px'}} className="logo" alt="logo"/>
                    <a class="navbar-brand" href="/home">ProducerPoint</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" aria-current="page" href="/Home">Home</a>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Cadastro
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="/cadastro-activity">Atividade</a></li>
                                <li><a class="dropdown-item" href="/cadastro-producer">Produtor</a></li>
                                <li><a class="dropdown-item" href="/cadastro-product">Produto</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle"  href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Listar
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="/lista-activities">Atividade</a></li>
                                <li><a class="dropdown-item" href="/lista-producers">Produtores</a></li>
                                <li><a class="dropdown-item" href="/lista-products">Produtos</a></li>
                            </ul>
                        </li>
                        <a onClick={handleLogout} class="nav-link" href="#" tabindex="-1" aria-disabled="true">Sair</a>
                    </div>
                    </div>
                </div>
            </nav>
        </> 
    );
}

export default Navbar;