import React from 'react';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import App from './App';
import List from './routes/list';
import Detail from './routes/detail';
import dynamic from './components/dynamic';

const { ConnectedRouter } = routerRedux;
const routerConfig = ({ history, app }) => { // eslint-disable-line
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route
            path="/home"
            component={dynamic(app, ['storeModel'], 'home')}
          />
          <Route path="/list" component={List} />
          <Route path="/detail" component={Detail} />
          <Redirect from="/" to="/home" />
        </Switch>
      </App>
    </ConnectedRouter>
  );
};
export default routerConfig;
