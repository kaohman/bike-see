import React from 'react';
import { App, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';
import { fetchCities } from '../../thunks/fetchCities';
import { fetchStations } from '../../thunks/fetchStations';
import { fetchFavorites } from '../../thunks/fetchFavorites';
import { setCurrentUser } from '../../actions';
jest.mock('../../thunks/fetchCities');
jest.mock('../../thunks/fetchStations');
jest.mock('../../thunks/fetchFavorites');

describe('App', () => {
  let wrapper;
  let fetchStationsMock;
  let fetchCitiesMock;
  let setFavoritesMock;
  let getCurrentUserMock;

  beforeEach(() => {
    fetchStationsMock = jest.fn();
    fetchCitiesMock = jest.fn();
    setFavoritesMock = jest.fn();
    getCurrentUserMock = jest.fn();
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

    it('should call getCurrentUser', () => {
      wrapper.instance().getCurrentUser = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().getCurrentUser).toHaveBeenCalled();
    });

    it('should call pullFromLocalStorage', () => {
      wrapper.instance().pullFromLocalStorage = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().pullFromLocalStorage).toHaveBeenCalled();
    });
  });

  describe('pullFromLocalStorage', () => {

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

    it('should call dispatch when fetchFavorites is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchFavorites();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchFavorites();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when setCurrentUser is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentUser();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentUser();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});