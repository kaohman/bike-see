import React from 'react';
import NotFound from './NotFound';
import { shallow } from 'enzyme';

describe('NotFound', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NotFound/>)
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});