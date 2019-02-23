import React from 'react';
import { App, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';
import { fetchCities } from '../../thunks/fetchCities';
import { fetchStations } from '../../thunks/fetchStations';
import { setFavorites } from '../../actions';
jest.mock('../../thunks/fetchCities');
jest.mock('../../thunks/fetchStations');

describe('App', () => {
  let wrapper;
  let fetchStationsMock;
  let fetchCitiesMock;
  let setFavoritesMock;

  beforeEach(() => {
    fetchStationsMock = jest.fn();
    fetchCitiesMock = jest.fn();
    setFavoritesMock = jest.fn();
    wrapper = shallow(
      <App
        fetchStations={fetchStationsMock}
        fetchCities={fetchCitiesMock}
        setFavorites={setFavoritesMock}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('should call fetchCities', () => {
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.fetchCities).toHaveBeenCalled();
    });

    it('should call pullFromLocalStorage', () => {
      wrapper.instance().pullFromLocalStorage = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().pullFromLocalStorage).toHaveBeenCalled();
    });
  });

  describe('pullFromLocalStorage', () => {
    it('should call setFavorites with the correct params', () => {
      const expected = ['1', '2', '3'];
      localStorage.setItem('bike-stops', JSON.stringify(expected));
      wrapper.instance().pullFromLocalStorage();
      expect(wrapper.instance().props.setFavorites).toHaveBeenCalledWith(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when fetchCities is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchCities();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchCities();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when fetchStations is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchStations();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchStations();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when setFavorites is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setFavorites();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setFavorites();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  })


});