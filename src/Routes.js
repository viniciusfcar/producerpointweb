import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from '../src/App';
import Home from '../src/pages/Home/Home';
import CadastroProducer from '../src/pages/CadastroProducer/CadastroProducer'
import ListaProducers from '../src/pages/ListaProducers/ListaProducers';
import RoutesPrivate from '../src/routes/RoutesPrivate';
import AuthContext from './components/Context/Context';
import CadastroProduct from '../src/pages/CadastroProuct/CadastroProduct';
import ListaProducts from '../src/pages/ListaProducts/ListaProducts';
import CadastroFarmingActivity from '../src/pages/CadastroFarmingActivity/CadastroFarmingActivity';
import ListaFarmingActivities from '../src/pages/ListaFarmingActivities/ListaFarmingActivities';

export default function Routes() {


  return (
    <Router>
      <Switch>
        <AuthContext>
          <Route exact path="/" component={App} />
          <RoutesPrivate path="/home" component={Home} />
          <RoutesPrivate path="/cadastro-producer" component={CadastroProducer} />
          <RoutesPrivate path="/lista-producers" component={ListaProducers} />
          <RoutesPrivate path="/cadastro-product" component={CadastroProduct} />
          <RoutesPrivate path="/lista-products" component={ListaProducts} />
          <RoutesPrivate path="/cadastro-farming-activity" component={CadastroFarmingActivity} />
          <RoutesPrivate path="/lista-farming-activities" component={ListaFarmingActivities} />
        </AuthContext>
      </Switch>
    </Router>
  );
}