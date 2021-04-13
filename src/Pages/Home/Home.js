import React from 'react';
import Navbar from '../../components/NavBar/Navbar.js';

import './Home.css';

function Home() {
    return(
        <> 
            <Navbar/> 
            <div className="container">
                <h1>Seja Bem-Vindo(a) ao ProducerPoint</h1>
            </div>
        </>
    );
}

export default Home;