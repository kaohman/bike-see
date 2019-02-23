import { citiesReducer } from './citiesReducer';
import * as actions from '../../actions';

describe('citiesReducer', () => {
  it('should return the default state', () => {
    const result = citiesReducer(undefined, {});
    expect(result).toEqual([]);
  });

  it('should return an array of cities in store', () => {
    const expected = [
      { name: 'Denver', stations: 26, id: 'denver' },
      { name: 'Capital Bikeshare', stations: 58, id: 'capital-bikeshare' }
    ];
    const result = citiesReducer(undefined, actions.setCities(expected));
    expect(result).toEqual(expected);
  })
});