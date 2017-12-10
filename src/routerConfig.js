import React from 'react';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import App from './App';
import Home from './routes/home';
import List from './routes/list';
import Detail from './routes/detail';

const { ConnectedRouter } = routerRedux;
const routerConfig = ({ history }) => { // eslint-disable-line
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/list" component={List} />
          <Route path="/detail" component={Detail} />
          <Redirect from="/" to="/home" />
        </Switch>
      </App>
    </ConnectedRouter>
  );
};
export default routerConfig;
