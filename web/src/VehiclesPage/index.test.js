import React from 'react';
import ReactDOM from 'react-dom';
import VehiclesPage from './index';
import { shallow,configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VehiclesPage />, div);
});

configure({adapter: new Adapter()});

describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<button onClick={mockCallBack}>Ok!</button>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

it('should call addNewVehicle function on submit new vehicle', () => {
    const wrapper = shallow(<VehiclesPage addNewVehicle={jest.fn()} />)
    wrapper.instance().addNewVehicle = jest.fn()
    wrapper.instance().forceUpdate()
    wrapper.update()
    wrapper.find('#addNewVehicle').simulate('click')
    expect(wrapper.instance().addNewVehicle).toHaveBeenCalled()
  });


it('should call function from changing visibility of form', () => {
    const wrapper = shallow(<VehiclesPage setFormVisibility={jest.fn()} />)
    wrapper.instance().setFormVisibility = jest.fn()
    wrapper.instance().forceUpdate()
    wrapper.update()
    wrapper.find('#setFormVisibility').simulate('click')
    expect(wrapper.instance().setFormVisibility).toHaveBeenCalled()
  });

