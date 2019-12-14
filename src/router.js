import React from 'react';
import { Router, Route } from 'dva/router';
import Login from './login/Login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Login} />
    </Router>
  );
}

export default RouterConfig;