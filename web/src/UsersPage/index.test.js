import React from 'react';
import ReactDOM from 'react-dom';
import UsersPage from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersPage />, div);
});