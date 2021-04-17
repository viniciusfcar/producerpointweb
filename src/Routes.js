import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from '../src/App';
import Home from '../src/pages/Home/Home';
import CadastroProducer from '../src/pages/CadastroProducer/CadastroProducer'
import ListaProducers from '../src/pages/ListaProducers/ListaProducers';
import RoutesPrivate from '../src/routes/RoutesPrivate';
import AuthContext from './components/Context/Context';

export default function Routes() {


  return (
    <Router>
      <Switch>
        <AuthContext>
          <Route exact path="/" component={App} />
          <RoutesPrivate path="/home" component={Home} />
          <RoutesPrivate path="/cadastro-producer" component={CadastroProducer} />
          <RoutesPrivate path="/lista-producers" component={ListaProducers} />
        </AuthContext>
      </Switch>
    </Router>
  );
}