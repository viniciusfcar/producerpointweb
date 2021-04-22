import React from 'react';
import Navbar from '../../components/NavBar/Navbar.js';

import './CadastroProducer.css';

function CadastroProducer() {

    return(
        <>
            <Navbar/>
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Cadastro Produtor</h3>
                </div>
            </nav>
            <div className="container">
                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Nick Name</label>
                        <input type="email" class="form-control" id="inputEmail4"/>
                    </div>
                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword4"/>
                    </div>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Ex: João de Oliveira"/>
                    </div>
                    <div class="col-12">
                        <label for="inputAddress2" class="form-label">E-mail</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Ex: joao@gmail.com"/>
                    </div>
                    <div class="col-md-2">
                        <label for="inputZip" class="form-label">Telefone</label>
                        <input type="text" class="form-control" id="inputZip"/>
                    </div>
                    <div class="col-md-2">
                        <label for="inputZip" class="form-label">CPF</label>
                        <input type="text" class="form-control" id="inputZip"/>
                    </div>
                    <div class="col-md-2">
                        <label for="inputZip" class="form-label">Data de Nascimento</label>
                        <input type="date" class="form-control" id="inputZip"/>
                    </div>
                    <div class="row g-2">
                        <div class="col-md-2">
                            <label for="inputZip" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="inputZip"/>
                        </div>
                        <div class="col-md-6">
                            <label for="inputCity" class="form-label">Logradouro</label>
                            <input type="text" class="form-control" id="inputCity"/>
                        </div>
                        <div class="col-md-2">
                            <label for="inputZip" class="form-label">Número</label>
                            <input type="text" class="form-control" id="inputZip"/>
                        </div>
                        <div class="col-md-6">
                            <label for="inputZip" class="form-label">Complemento</label>
                            <input type="text" class="form-control" id="inputZip"/>
                        </div>
                        <div class="col-md-6">
                            <label for="inputCity" class="form-label">Bairro</label>
                            <input type="text" class="form-control" id="inputCity"/>
                        </div>
                        <div class="col-md-6">
                            <label for="inputCity" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="inputCity"/>
                        </div>
                        <div class="col-md-4">
                            <label for="inputState" class="form-label">Estado</label>
                            <select id="inputState" class="form-select">
                                <option selected>Selecione</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-4">
                        <label for="inputState" class="form-label">Atividade Agrícola</label>
                        <select id="inputState" class="form-select">
                            <option selected>Selecione</option>
                            <option>...</option>
                        </select>
                    </div>
                    <label for="inputState" class="form-label">Produtos</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label class="form-check-label" for="flexCheckChecked">
                            Leite
                        </label>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CadastroProducer;