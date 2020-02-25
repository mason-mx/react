import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Chassis from './Chassis';
import './index.css';

const BLADES = [
  {category: 'Laser', model: '195888', present: true, serial: 'Laser-11'},
  {category: 'Laser', model: '195888', present: true, serial: 'Laser-12'},
  {category: 'Laser', model: '195888', present: false, serial: 'Laser-13'},
  {category: 'Switch', model: '195888', present: true, serial: 'Switch-11'},
  {category: 'Switch', model: '195888', present: false, serial: 'Switch-12'},
  {category: 'Switch', model: '195888', present: true, serial: 'Switch-13'}
];

ReactDOM.render(
  <App support24Hour={false} />,
  document.getElementById('root')
);

ReactDOM.render(
  <Chassis blades={BLADES} />,
  document.getElementById('instrument')
);