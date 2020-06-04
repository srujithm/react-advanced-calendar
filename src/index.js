import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Calendar from './Calendar/Calendar';

ReactDOM.render(
  <React.StrictMode>
    <Calendar view="week"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
