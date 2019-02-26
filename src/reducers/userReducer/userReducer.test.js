import { userReducer } from './userReducer';
import * as actions from '../../actions';

describe('userReducer', () => {
  it('should return the default state', () => {
    const result = userReducer(undefined, {});
    expect(result).toEqual({});
  });

  it('should set loading to false', () => {
    const expected = { name: 'Bobby', email: 'b@b'};
    const result = userReducer(undefined, actions.setCurrentUser(expected));
    expect(result).toEqual(expected);
  })
});