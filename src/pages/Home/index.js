import React, { useContext } from 'react';
import { AuthContext } from '../../components/Context/AuthContext.js';
import Navbar from '../../components/NavBar/Navbar.js';

import './style.css';

function Home() {

    const { user } = useContext(AuthContext)

    return (
        <>
            <Navbar />
            <nav class="navbar" style={{ marginTop: 10, backgroundColor: 'lightgray' }}>
                <div className="container" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                    <h3>Bem-vindo ao Producer Point, {user?.name}</h3>
                </div>
            </nav>
        </>
    );
}

export default Home;