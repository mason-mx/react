import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Chassis from './Chassis';
import './index.css';

ReactDOM.render(
  <App support24Hour={false} />,
  document.getElementById('root')
);

ReactDOM.render(
  <Chassis />,
  document.getElementById('instrument')
);