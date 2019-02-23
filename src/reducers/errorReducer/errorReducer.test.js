import { errorReducer } from './errorReducer'
import * as actions from '../../actions'

describe('errorReducer', () => {
  it('should return the default state', () => {
    const result = errorReducer(undefined, {})
    expect(result).toEqual('')
  });

  it('should return the error to set', () => {
    const expected = 'This is an error'
    const result = errorReducer(undefined, actions.setError('This is an error'))
    expect(result).toEqual(expected)
  })
});