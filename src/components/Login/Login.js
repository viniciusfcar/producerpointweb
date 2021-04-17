import React, {useEffect, useState, useContext} from 'react';
import './Login.css';
import logo from '../../imagens/logo.png';
import { useHistory } from "react-router-dom";
import {AuthContext} from '../Context/Context';

function Login() {
    
    const history = useHistory();

    const { setUsuario } = useContext(AuthContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const on_email = (evento) => {
        setEmail(evento.target.value);
    }

    const on_password = (evento) => {
        setPassword(evento.target.value);
    }

    const onSubmit = async () => {
        if(email == null || password == null) {
            setTitle('Erro de Preenchimento');
            setBody('Preencha os campos de E-mail e Senha.');
            setShow(true);
        
        } else {
            const body = {email: email, password: password}
            const request = await fetch('https://apiproducers.serviceapp.net.br/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            
            const response = await request.json()

            if(response != null){
                setUsuario(response);
                history.push('/home');
                
            } else {
                setTitle('Dados Inválidos');
                setBody('E-mail e/ou Senha inválidos, tente novamente.');
                setShow(true);
            } 
        }        
    }

    return(
        <>
            <header className="header">
                <img src={logo} className="logo" alt="logo"/>
                <h2 className="title">ProducerPoint</h2>
                <div>
                    <input className="input" type="text" onChange={on_email} placeholder="E-mail" />
                </div>
                <div>
                    <input className="input" type="password" onChange={on_password} placeholder="Senha" />
                </div>
                <button className="button" onClick={onSubmit}>Entrar</button>
            </header>
        </>
    )
}

export default Login;