import React from 'react';
import { BikeMap, mapStateToProps, mapDispatchToProps } from './BikeMap';
import { shallow } from 'enzyme';
import { fetchStations } from '../../thunks/fetchStations';
import { postFavorite } from '../../thunks/postFavorite';
import { deleteFavorite } from '../../thunks/deleteFavorite';
jest.mock('../../thunks/fetchStations');
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

  beforeEach(() => {
    mockUser = { id: '1', name: 'Bob', email: 'bob@bob.com', password: 'password'};
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
    deleteFavoriteMock = jest.fn();
    postFavoriteMock = jest.fn();
    mockEvent = { target: { options: {id: '1'} } };
    mockHistory = { replace: jest.fn() };
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
    it('should call deleteFavorite with the correct params', () => {
      wrapper.instance().toggleFavorite(mockEvent);
      expect(wrapper.instance().props.deleteFavorite).toHaveBeenCalledWith('1','1');
    });

    it('should call postFavorite with the correct params', () => {
      mockEvent = { target: { options: { id: '5' } } };
      wrapper.instance().toggleFavorite(mockEvent);
      expect(wrapper.instance().props.postFavorite).toHaveBeenCalledWith('5', '1');
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