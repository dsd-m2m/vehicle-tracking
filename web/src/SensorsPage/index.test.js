import React from 'react';
import ReactDOM from 'react-dom';
import SensorsPage from './index';
import { shallow,configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SensorsPage />, div);
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
