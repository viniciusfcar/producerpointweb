import React from 'react'
import logo from '../../imagens/logo.png';
import './Navbar.css';

import { doLogout } from '../../services/auth'
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {

    const { user } = React.useContext(AuthContext)

    const handleLogout = () => {
        doLogout()
        window.location.href = '/'
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <img src={logo} style={{ height: '48px' }} className="logo" alt="logo" />
                    <h4>Olá, {user?.name}</h4>
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
                                    <li><a class="dropdown-item" href="/cadastro-product">Produto</a></li>
                                    <li><a class="dropdown-item" href="/cadastro-producer">Produtor</a></li>
                                    {user?.role != 0 ? "" :
                                    <li><a class="dropdown-item" href="/cadastro-manager">Usuário</a></li>
                                    }
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Listar
                            </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="dropdown-item" href="/lista-activities">Atividade</a></li>
                                    <li><a class="dropdown-item" href="/lista-products">Produtos</a></li>
                                    <li><a class="dropdown-item" href="/lista-producers">Produtores</a></li>
                                    {user?.role != 0 ? "" :
                                    <li><a class="dropdown-item" href="/lista-managers">Usuários</a></li>
                                    }
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