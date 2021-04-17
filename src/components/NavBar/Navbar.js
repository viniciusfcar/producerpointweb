import React, {useEffect, useState, useContext} from 'react';
import Nav from 'react-bootstrap/Nav';
import {AuthContext} from '../Context/Context';

const Navbar = () => {

    const {usuario} = useContext(AuthContext);
    console.log(usuario);
    return(
        <>
            <Nav fill variant="pills">
                <Nav.Item>
                    <Nav.Link eventKey="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link to="/cadastro-producer">Cadastro Produtores</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/lista-producers">Lista Produtores</Nav.Link>
                </Nav.Item>
            </Nav>
        </> 
    );
}

export default Navbar;