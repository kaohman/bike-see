import * as actions from './index';

describe('actions', () => {
  it('should return a type of SET_LOADING, with a loading status', () => {
    const loading = false;
    const expected = {
      type: 'SET_LOADING',
      loading
    };
    const result = actions.setLoading(loading);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_ERROR, with an error message', () => {
    const error = 'Error message';
    const expected = {
      type: 'SET_ERROR',
      error
    };
    const result = actions.setError(error);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_CITIES, with an array of cities', () => {
    const cities = [
      { name: 'Denver', stations: 26, id: 'denver' },
      { name: 'Capital Bikeshare', stations: 58, id: 'capital-bikeshare' }
    ];
    const expected = {
      type: 'SET_CITIES',
      cities
    };
    const result = actions.setCities(cities);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_CURRENT_CITY, with a current city', () => {
    const city = 'Denver';
    const expected = {
      type: 'SET_CURRENT_CITY',
      city
    };
    const result = actions.setCurrentCity(city);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_STATIONS, with an array of stations', () => {
    const stations = [
      { name: '30th & Blake', id: '1', bikes_available: 8 },
      { name: '1st & Broadway', id: '2', bikes_available: 5 }
    ];
    const expected = {
      type: 'SET_STATIONS',
      stations
    };
    const result = actions.setStations(stations);
    expect(result).toEqual(expected);
  });

  it('should return a type of TOGGLE_FAVORITE, with a favorite', () => {
    const favorite = '4';
    const expected = {
      type: 'TOGGLE_FAVORITE',
      favorite
    };
    const result = actions.toggleFavorite(favorite);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_FAVORITES, with an array of favorites', () => {
    const favorites = ['1', '2', '3', '4'];
    const expected = {
      type: 'SET_FAVORITES',
      favorites
    };
    const result = actions.setFavorites(favorites);
    expect(result).toEqual(expected);
  });
  
});