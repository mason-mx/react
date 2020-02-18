import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Chassis from './Chassis';
import './index.css';

const BLADES = [
  {category: 'Laser', moduleNum: '195888', present: true, name: 'Laser-11'},
  {category: 'Laser', moduleNum: '195888', present: true, name: 'Laser-12'},
  {category: 'Laser', moduleNum: '195888', present: false, name: 'Laser-13'},
  {category: 'Switch', moduleNum: '195888', present: true, name: 'Switch-11'},
  {category: 'Switch', moduleNum: '195888', present: false, name: 'Switch-12'},
  {category: 'Switch', moduleNum: '195888', present: true, name: 'Switch-13'}
];

ReactDOM.render(
  <App support24Hour={false} />,
  document.getElementById('root')
);

ReactDOM.render(
  <Chassis blades={BLADES} />,
  document.getElementById('instrument')
);