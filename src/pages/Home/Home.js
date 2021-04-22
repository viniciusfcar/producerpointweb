import React from 'react';
import Navbar from '../../components/NavBar/Navbar.js';

import './Home.css';

function Home() {

    return(
        <> 
            <Navbar/> 
            <nav class="navbar" style={{marginTop: 10, backgroundColor: 'lightgray'}}>
                <div class="container-fluid" style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3>Seja bem-bindo ao ProducerPoint</h3>
                </div>
            </nav>
        </>
    );
}

export default Home;