import React from 'react';
import ReactDOM from 'react-dom';
import SensorsPage from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SensorsPage />, div);
});