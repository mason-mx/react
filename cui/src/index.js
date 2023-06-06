import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CNavbar from './navbar';
import CFooter from './footer';
import Instrument from './instrument';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

const instr = ReactDOM.createRoot(document.getElementById('root'));
instr.render(
  <React.StrictMode>
    <Instrument ref={(instrComponent) => {window.instrComponent = instrComponent}}/>
  </React.StrictMode>
);

const navbar = ReactDOM.createRoot(document.getElementById('navbar'));
navbar.render(
  <React.StrictMode>
    <CNavbar />
  </React.StrictMode>
);

const footer = ReactDOM.createRoot(document.getElementById('footer'));
footer.render(
  <React.StrictMode>
    <CFooter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
