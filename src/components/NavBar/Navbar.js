import React, {useEffect, useState} from 'react';
import Nav from 'react-bootstrap/Nav'

const Navbar = () => {
    return(
        <>
            <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/cadastro-producer">Cadastro Produtores</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/lista-producers">Lista Produtores</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default Navbar;