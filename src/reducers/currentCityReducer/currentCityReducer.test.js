import { currentCityReducer } from './currentCityReducer';
import * as actions from '../../actions';

describe('currentCityReducer', () => {
  it('should return the default state', () => {
    const result = currentCityReducer(undefined, {});
    expect(result).toEqual('');
  });

  it('should return an string of the current city', () => {
    const expected = 'Denver';
    const result = currentCityReducer(undefined, actions.setCurrentCity(expected));
    expect(result).toEqual(expected);
  })
});