import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Instrument from './Instrument';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <App support24Hour={false} />,
  document.getElementById('root')
);

ReactDOM.render(
  <Instrument />,
  document.getElementById('instrument')
);