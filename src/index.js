import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

import { createStore } from './store'
import Backendless from 'backendless'

Backendless.initApp('90F08A15-C8AB-E425-FFAE-F8FF47545800', '0257EBC7-C08D-3FF4-FFE9-D48D46B0B100');

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={createStore()}>
    <App/>
  </Provider>,
  rootElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
