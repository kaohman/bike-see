import React from 'react';
import { BikeMap, mapStateToProps, mapDispatchToProps } from './BikeMap';
import { shallow } from 'enzyme';
import { fetchStations } from '../../thunks/fetchStations';
import { toggleFavorite } from '../../actions';
jest.mock('../../thunks/fetchStations');

describe('BikeMap', () => {
  let wrapper;
  let fetchStationsMock;
  let toggleFavoriteMock;
  let mockCities;
  let mockStations;
  let mockFavorites;
  let mockEvent;
  let mockHistory;

  beforeEach(() => {
    mockCities = [
      { name: 'Denver', stations: 26, id: 'denver' },
      { name: 'Capital Bikeshare', stations: 58, id: 'capital-bikeshare' }
    ];
    mockStations = [
      { name: '1st & Broadway', bikes_available: 5, id: '1' },
      { name: '18th & Blake', bikes_available: 8, id: '2' }
    ];
    mockFavorites = ['1'];
    fetchStationsMock = jest.fn();
    toggleFavoriteMock = jest.fn();
    mockEvent = { target: { options: {id: '1'} } };
    mockHistory = { replace: jest.fn() };
    global.navigator.geolocation = {getCurrentPosition: jest.fn()};
    wrapper = shallow(
      <BikeMap
        cities={mockCities}
        stations={mockStations}
        favorites={mockFavorites}
        fetchStations={fetchStationsMock}
        toggleFavorite={toggleFavoriteMock}
        history={mockHistory}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getLocation', () => {
    it('should call navigator.geolocation.getCurrentPosition', () => {
      wrapper.instance().getLocation();
      expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
  });

  describe('getStations', () => {
    it('should call fetchStations with the correct params', () => {
      wrapper.instance().getStations(mockEvent);
      expect(fetchStationsMock).toHaveBeenCalledWith('1');
    });

    it('should update the path', () => {
      wrapper.instance().getStations(mockEvent);
      expect(wrapper.instance().props.history.replace).toHaveBeenCalledWith('/stations');
    });
  });

  describe('toggleFavorite', () => {
    it('should call toggleFavorite with the correct params', () => {
      wrapper.instance().toggleFavorite(mockEvent);
      expect(wrapper.instance().props.toggleFavorite).toHaveBeenCalledWith('1');
    });

    it('should call setLocalStorage', () => {
      wrapper.instance().setLocalStorage = jest.fn();
      wrapper.instance().toggleFavorite(mockEvent);
      expect(wrapper.instance().setLocalStorage).toHaveBeenCalled();
    });
  });

  describe('createStationMarkers', () => {
    it('', () => {

    });
  });

  describe('createCityMarkers', () => {
    it('', () => {

    });
  });

  describe('showMarkers', () => {
    it('', () => {

    });
  });

  describe('componentDidMount', () => {
    it('should call getLocation', () => {
      wrapper.instance().getLocation = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().getLocation).toHaveBeenCalled();
    });

    it('should set loading in state to false', () => {
      wrapper.instance().getLocation = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.state('loading')).toEqual(false);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      const mockState = {
        cities: mockCities,
        stations: mockStations,
        favorites: mockFavorites,
        otherState: false,
      };
      const expected = {
        cities: mockCities,
        stations: mockStations,
        favorites: mockFavorites
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when fetchStations is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchStations();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchStations();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when toggleFavorite is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = toggleFavorite();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.toggleFavorite();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});