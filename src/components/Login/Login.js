import React, {useEffect, useState} from 'react';
import './Login.css';
import logo from '../../imagens/logo.png';

const Login = () => {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const on_email = (evento) => {
        setEmail(evento.target.value);
    }

    const on_password = (evento) => {
        setPassword(evento.target.value);
    }

    const entrar = async () => {
        console.log('aqui')
        const form = new FormData()
        form.append('email', email)
        form.append('password', password)

        const request = await fetch('https://producersapi.herokuapp.com/api/signin', {
            method: 'POST',
            body: form
        })

        const response = await request.json()

        console.log(response)
    }

    return(
        <header className="header">
            <img src={logo} className="logo" alt="logo"/>
            <h2 className="title">ProducerPoint</h2>
            <div>
                <input className="input" type="text" onChange={on_email} placeholder="E-mail" />
            </div>
            <div>
                <input className="input" type="password" onChange={on_password} placeholder="Senha" />
            </div>
            <button className="button" onClick={entrar}>Entrar</button>
        </header>
    )
}

export default Login;