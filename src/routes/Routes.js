import React from 'react'
import { Switch } from 'react-router-dom'

import RouteHandler from '../components/RouteHandler'

import SignIn from '../pages/SignIn'

import Home from '../pages/Home/Home'
import CadastroProducer from '../pages/CadastroProducer/CadastroProducer'
import CadastroProduct from '../pages/CadastroProuct/CadastroProduct';
import CadastroActivity from '../pages/CadastroActivity/CadastroActivity';
import ListaProducers from '../pages/ListaProducers/ListaProducers';
import ListaProducts from '../pages/ListaProducts/ListaProducts';
import ListaActivities from '../pages/ListaActivities/ListaActivities';
import DetalhesProducer from '../pages/DetalhesProducer/DetalhesProducer';
import DetalhesProduct from '../pages/DetalhesProduct/DetalhesProduct';
import DetalhesActivity from '../pages/DetalhesActivity/DetalhesActivity';

const Routes = () => {
    return (
        <Switch>
            <RouteHandler exact path='/'>
                <SignIn />
            </RouteHandler>

            <RouteHandler private path="/home">
                <Home />
            </RouteHandler>

            <RouteHandler private path="/cadastro-producer">
                <CadastroProducer />
            </RouteHandler>
            <RouteHandler private exact path="/cadastro-producer/:id" children={<CadastroProducer />} />

            <RouteHandler private path="/cadastro-product">
                <CadastroProduct />
            </RouteHandler>
            <RouteHandler private exact path="/cadastro-product/:id" children={<CadastroProduct />} />

            <RouteHandler private path="/cadastro-activity">
                <CadastroActivity />
            </RouteHandler>
            <RouteHandler private exact path="/cadastro-activity/:id" children={<CadastroActivity />} />

            <RouteHandler private path="/lista-producers">
                <ListaProducers />
            </RouteHandler>

            <RouteHandler private path="/lista-products">
                <ListaProducts />
            </RouteHandler>

            <RouteHandler private path="/lista-activities">
                <ListaActivities />
            </RouteHandler>

            <RouteHandler private path="/detalhes-producer/:id">
                <DetalhesProducer />
            </RouteHandler>

            <RouteHandler private path="/detalhes-product/:id">
                <DetalhesProduct />
            </RouteHandler>

            <RouteHandler private path="/detalhes-activity/:id">
                <DetalhesActivity />
            </RouteHandler>
        </Switch>
    )
}

export default Routes