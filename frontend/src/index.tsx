import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable'
import { Provider } from 'react-redux'
import './index.scss';
import App from './App';
import configureStore from './store'
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory()
const store = configureStore(history)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
