import React from 'react';
import Navbar from '../../components/NavBar/Navbar.js';
import { useHistory } from "react-router-dom";

import './Home.css';

function Home() {
    const history = useHistory();

    const onSubmit = (event) => {
        history.push('/cadastro-producer');
    }

    return(
        <> 
            <Navbar/> 
            <button onClick={onSubmit}>Cadastro</button>
            <div className="container">
                <h1>Seja Bem-Vindo(a) ao ProducerPoint</h1>
            </div>
        </>
    );
}

export default Home;