import { favoritesReducer } from './favoritesReducer';
import * as actions from '../../actions';

describe('favoritesReducer', () => {
  it('should return the default state', () => {
    const result = favoritesReducer(undefined, {});
    expect(result).toEqual([]);
  });

  it('should return an array of favorites in store', () => {
    const expected = ['1', '2', '3'];
    const result = favoritesReducer(undefined, actions.setFavorites(expected));
    expect(result).toEqual(expected);
  })

  it('should be able to add a favorite to store', () => {
    const expected = ['1', '2', '3', '4'];
    const result = favoritesReducer(['1', '2', '3'], actions.toggleFavorite('4'));
    expect(result).toEqual(expected);
  })

  it('should remove a favorite from store', () => {
    const expected = ['1', '2', '3'];
    const result = favoritesReducer(['1', '2', '3', '4'], actions.toggleFavorite('4'));
    expect(result).toEqual(expected);
  })
});