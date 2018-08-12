import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store/createStore';
import App from './containers/App';
import routes from './routes/index';
import 'antd/dist/antd.css';

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
});

const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

const MOUNT_NODE = document.getElementById('root');

let render = (routerKey = null) => {
  ReactDOM.render(
    <App
      store={store}
      history={history}
      routes={routes(store)}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  );
};

render();
