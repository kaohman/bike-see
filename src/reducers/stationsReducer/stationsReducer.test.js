import { stationsReducer } from './stationsReducer';
import * as actions from '../../actions';

describe('stationsReducer', () => {
  it('should return the default state', () => {
    const result = stationsReducer(undefined, {});
    expect(result).toEqual([]);
  });

  it('should return an array of stations in store', () => {
    const expected = [
      { name: '30th & Blake', id: '1', bikes_available: 8 },
      { name: '1st & Broadway', id: '2', bikes_available: 5 }
    ];
    const result = stationsReducer(undefined, actions.setStations(expected));
    expect(result).toEqual(expected);
  })
});