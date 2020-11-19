import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Dados from '../pages/Dashboard/Form';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Recovery from '../pages/Recovery';
import ChangePassword from '../pages/ChangePassword';
import Profile from '../pages/Profile';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Login" component={Login} />
      <Route path="/app" isPrivate exact component={Dashboard} />
      <Route path="/app/editar/:id" isPrivate component={Dados} />
      <Route path="/app/adicionar" isPrivate component={Dados} />
      <Route path="/recuperarSenha" exact component={Recovery} />
      <Route path="/alterarSenha/:token" component={ChangePassword} />
      <Route path="/perfil" isPrivate component={Profile} />
    </Switch>
  );
};

export default Routes;
