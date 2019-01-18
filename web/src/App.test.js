import React from 'react';
import ReactDOM from 'react-dom';
import { shallow,configure} from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';


import HomePage from './HomePage';
import LoginPage from './LoginPage';
import VehiclesPage from './VehiclesPage';
import SensorsPage from './SensorsPage';
import UsersPage from './UsersPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


configure({adapter: new Adapter()});

describe('component', () => {

    let element;

    beforeEach(() => {
      element = <App />
    });

    it('routes /login to LoginPage', () => {
      const component = shallow(element);
      expect(component.find('Route[path="/login"]').first().prop('component')).toBe(LoginPage);
    });

    it('routes / to HomePage', () => {
      const component = shallow(element);
      expect(component.find('PrivateRoute[exact=true][path="/"]').first().prop('component')).toBe(HomePage);
    });

    it('routes /vehicles to VehiclesPage', () => {
      const component = shallow(element);
      expect(component.find('PrivateRoute[path="/vehicles"]').first().prop('component')).toBe(VehiclesPage);
    });

    it('routes /users to UsersPage', () => {
      const component = shallow(element);
      expect(component.find('PrivateRoute[path="/users"]').first().prop('component')).toBe(UsersPage);
    });

    it('routes /sensors to SensorsPage', () => {
      const component = shallow(element);
      expect(component.find('PrivateRoute[path="/sensors"]').first().prop('component')).toBe(SensorsPage);
    });

    it('routes / to HomePage', () => {
      const component = shallow(element);
      expect(component.find('Route[exact=true][path="/contact"]').first().prop('component')).toBe(ContactPage);
    });

    it('routes / to HomePage', () => {
      const component = shallow(element);
      expect(component.find('Route[exact=true][path="/about"]').first().prop('component')).toBe(AboutPage);
    });

    

  });
