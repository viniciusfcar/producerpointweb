import React, {useEffect, useState, useContext} from 'react';
import { useHistory } from "react-router-dom";

const Navbar = () => {

    const history = useHistory();

    const Home = () => {
        history.push('/home');
    }

    const Cadastro = () => {
        history.push('/cadastro-producer');
    }

    const Lista = () => {
        history.push('/lista-producers');
    }
    return(
        <>
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a href="/home" class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
                    <a href="/cadastro-producer" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"></div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"></div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab"></div>
            </div>
        </> 
    );
}

export default Navbar;