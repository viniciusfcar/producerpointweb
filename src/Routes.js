import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";

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
import DetalhesProducer from '../src/pages/DetalhesProducer/DetalhesProducer';
import DetalhesProduct from '../src/pages/DetalhesProduct/DetalhesProduct';
import DetalhesActivity from '../src/pages/DetalhesActivity/DetalhesActivity';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <AuthContext>
          <Route exact path="/" component={App} />
          <RoutesPrivate path="/home" component={Home} />
          <RoutesPrivate path="/cadastro-producer" exact component={CadastroProducer} />
          <RoutesPrivate path="/cadastro-producer/:id" exact children={<CadastroProducer />} />
          <RoutesPrivate path="/lista-producers" component={ListaProducers} />
          <RoutesPrivate path="/cadastro-product" exact component={CadastroProduct} />
          <RoutesPrivate path="/cadastro-product/:id" exact children={<CadastroProduct />} />
          <RoutesPrivate path="/lista-products" component={ListaProducts} />
          <RoutesPrivate path="/cadastro-farming-activity" exact component={CadastroFarmingActivity} />
          <RoutesPrivate path="/cadastro-farming-activity/:id" exact children={<CadastroFarmingActivity />} />
          <RoutesPrivate path="/lista-farming-activities" component={ListaFarmingActivities} />
          <RoutesPrivate path="/detalhes-producer/:id" component={DetalhesProducer} />
          <RoutesPrivate path="/detalhes-product/:id" component={DetalhesProduct} />
          <RoutesPrivate path="/detalhes-activity/:activityName" component={DetalhesActivity} />
        </AuthContext>
      </Switch>
    </Router>
  );
}