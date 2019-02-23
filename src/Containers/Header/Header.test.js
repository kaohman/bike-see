import React from 'react';
import { Header, mapStateToProps } from './Header';
import { shallow } from 'enzyme';

describe('Header', () => {
  let wrapper;
  let loadingMock;
  let currentCityMock;
  let locationMock;

  it('should match the correct snapshot when loading', () => {
    locationMock = { pathname: '/'};
    loadingMock = true;
    currentCityMock = '';

    wrapper = shallow(
      <Header
        loading={loadingMock}
        currentCity={currentCityMock}
        location={locationMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the home page', () => {
    locationMock = { pathname: '/' };
    loadingMock = false;
    currentCityMock = '';

    wrapper = shallow(
      <Header
        loading={loadingMock}
        currentCity={currentCityMock}
        location={locationMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the stations page', () => {
    locationMock = { pathname: '/stations' };
    loadingMock = false;
    currentCityMock = 'Denver';

    wrapper = shallow(
      <Header
        loading={loadingMock}
        currentCity={currentCityMock}
        location={locationMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when on the my-stops page', () => {
    locationMock = { pathname: '/my-stops' };
    loadingMock = false;
    currentCityMock = 'Denver';

    wrapper = shallow(
      <Header
        loading={loadingMock}
        currentCity={currentCityMock}
        location={locationMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });


  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      const mockState = {
        loading: true,
        currentCity: 'Denver',
        otherState: false,
      };
      const expected = {
        loading: true,
        currentCity: 'Denver',
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });
});