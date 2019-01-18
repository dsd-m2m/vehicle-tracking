import React from 'react';
import ReactDOM from 'react-dom';
import VehiclesPage from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VehiclesPage />, div);
});