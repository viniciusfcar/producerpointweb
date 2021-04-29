import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from '../components/Context/Context';

const RoutesPrivate = ({ component: Component, ...rest}) => {
  const { usuario } = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={() => usuario
        ? <Component {...rest} />
        : <Redirect to="/" />
      }
    />
  )
}

export default RoutesPrivate;