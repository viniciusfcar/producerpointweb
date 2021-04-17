import React from 'react';
import Navbar from '../../components/NavBar/Navbar.js';

import './CadastroProducer.css';

function CadastroProducer() {

    return(
        <>
            <Navbar/>
            <div className="container">
                <h2>Cadastro do Produtor</h2>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <form method="post" enctype="multipart/form-data">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input type="text" id="nome" name="nome" class="form-control" placeholder="Nome" required/>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input type="text" name="cpf" class="form-control" placeholder="CPF" required/>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input type="text" name="email" class="form-control" placeholder="E-mail" required/>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input type="text" name="phone" class="form-control" placeholder="Telefone" required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input type="text" id="nickname" name="nickname" class="form-control" placeholder="Username" required/>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input type="password" id="password" name="password" class="form-control" placeholder="Senha" required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <a href="{% url 'index' %}" class="btn btn-danger col-md-4">Cancelar</a>
                                            <button type="submit" id="btn" class="btn btn-success col-md-6">Cadastrar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroProducer;