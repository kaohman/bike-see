import React from 'react';
import { BikeMap, mapStateToProps, mapDispatchToProps } from './BikeMap';
import { shallow } from 'enzyme';
import { fetchStations } from '../../thunks/fetchStations';
import { fetchCities } from '../../thunks/fetchCities';
import { postFavorite } from '../../thunks/postFavorite';
import { deleteFavorite } from '../../thunks/deleteFavorite';
jest.mock('../../thunks/fetchStations');
jest.mock('../../thunks/fetchCities');
jest.mock('../../thunks/postFavorite');
jest.mock('../../thunks/deleteFavorite');

describe('BikeMap', () => {
  let wrapper;
  let fetchStationsMock;
  let deleteFavoriteMock;
  let postFavoriteMock;
  let mockCities;
  let mockStations;
  let mockFavorites;
  let mockEvent;
  let mockHistory;
  let mockUser;
  let mockLocation;

  beforeEach(() => {
    mockUser = { id: '1', name: 'Bob' };
    mockStations = [
      { name: '1st & Broadway', bikes_available: 5, id: '1' },
      { name: '18th & Blake', bikes_available: 8, id: '2' }
    ];
    mockFavorites = ['1'];
    fetchCitiesMock = jest.fn();
    fetchStationsMock = jest.fn();
    deleteFavoriteMock = jest.fn();
    postFavoriteMock = jest.fn();
    mockEvent = { target: {id: '1'} };
    mockHistory = { replace: jest.fn() };
    mockLocation = { pathname: '/' };
    global.navigator.geolocation = {getCurrentPosition: jest.fn()};
    wrapper = shallow(
      <BikeMap
        cities={mockCities}
        stations={mockStations}
        favorites={mockFavorites}
        user={mockUser}
        fetchStations={fetchStationsMock}
        deleteFavorite={deleteFavoriteMock}
        postFavorite={postFavoriteMock}
        history={mockHistory}
        location={mockLocation}
        fetchCities={fetchCitiesMock}
      />
    )
  });

  it('should match the correct snapshot for stations', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot for stops', () => {
    mockLocation = { pathname: '/my-stops' };
    wrapper = shallow(
      <BikeMap
        cities={mockCities}
        stations={mockStations}
        favorites={mockFavorites}
        user={mockUser}
        fetchStations={fetchStationsMock}
        deleteFavorite={deleteFavoriteMock}
        postFavorite={postFavoriteMock}
        history={mockHistory}
        fetchCities={fetchCitiesMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('getLocation', () => {
    it('should call navigator.geolocation.getCurrentPosition', () => {
      wrapper.instance().getLocation();
      expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
  });

  describe('toggleFavorite', () => {
    it('should call deleteFavorite with the correct params', () => {
      wrapper.instance().toggleFavorite(mockEvent);
      expect(wrapper.instance().props.deleteFavorite).toHaveBeenCalledWith('1','1');
    });

    it('should call postFavorite with the correct params', () => {
      mockEvent = { target: { id: '5' } };
      wrapper.instance().toggleFavorite(mockEvent);
      expect(wrapper.instance().props.postFavorite).toHaveBeenCalledWith('5', '1');
    });
  });

  describe('showMarkers', () => {
    it('should call createStationMarkers when on my-stops page', () => {
      mockLocation = { pathname: '/my-stops' };
      wrapper = shallow(
        <BikeMap
          cities={mockCities}
          stations={mockStations}
          favorites={mockFavorites}
          history={mockHistory}
          location={mockLocation}
          fetchCities={fetchCitiesMock}
        />
      );
      wrapper.instance().createStationMarkers = jest.fn();
      wrapper.instance().showMarkers();
      expect(wrapper.instance().createStationMarkers).toHaveBeenCalled();
    });

    it('should call createStationMarkers when on stations page', () => {
      mockLocation = { pathname: '/stations' };
      wrapper = shallow(
        <BikeMap
          cities={mockCities}
          stations={mockStations}
          favorites={mockFavorites}
          history={mockHistory}
          location={mockLocation}
          fetchCities={fetchCitiesMock}
        />
      );
      wrapper.instance().createStationMarkers = jest.fn();
      wrapper.instance().showMarkers();
      expect(wrapper.instance().createStationMarkers).toHaveBeenCalled();
    });
  });

  describe('componentDidMount', () => {
    it('should call fetchCities', async () => {
      wrapper.instance().getLocation = jest.fn();
      await wrapper.instance().componentDidMount();
      expect(fetchCitiesMock).toHaveBeenCalled();
    });

    it('should call getLocation', async () => {
      wrapper.instance().getLocation = jest.fn();
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().getLocation).toHaveBeenCalled();
    });

    it.skip('should set loading in state to false', async () => {
      wrapper.instance().getLocation = jest.fn();
      await wrapper.instance().componentDidMount();
      expect(wrapper.state('loading')).toEqual(false);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      const mockState = {
        cities: mockCities,
        stations: mockStations,
        favorites: mockFavorites,
        user: mockUser,
        otherState: false,
      };
      const expected = {
        cities: mockCities,
        stations: mockStations,
        favorites: mockFavorites,
        user: mockUser,
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
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

    it('should call dispatch when deleteFavorite is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = deleteFavorite();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteFavorite();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when postFavorite is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = postFavorite();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.postFavorite();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});