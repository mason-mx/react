import React from 'react';
import ReactDOM from 'react-dom';
import Chassis from './Chassis';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chassis />, div);
});
