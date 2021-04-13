import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from '../src/App';
import Home from '../src/Pages/Home/Home';
import CadastroProducer from '../src/Pages/CadastroProducer/CadastroProducer';
import ListaProducers from '../src/Pages/ListaProducers/ListaProducers';

export default function Routes() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/home" component={Home} />
            <Route path="/cadastro-producer" component={CadastroProducer} />
            <Route path="/lista-producers" component={ListaProducers} />
        </Switch>
    </Router>
  );
}