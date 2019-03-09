import { fetchExistingUser } from '../fetchExistingUser';
import { setLoading, setError } from '../../actions';
import { fetchData } from '../../utils/api';
import { fetchFavorites } from '../fetchFavorites';
jest.mock('../../utils/api');
jest.mock('../fetchFavorites');

describe('fetchExistingUser', () => {
  let mockDispatch;
  let mockUserId;

  beforeEach(() => {
    mockUserId = '1';
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = fetchExistingUser(mockUserId);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = fetchExistingUser(mockUserId);
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith(`https://bike-see.herokuapp.com/api/v1/users/${mockUserId}`, 'GET');
  });

  it('should dispatch fetchFavorites if response is ok', async () => {
    const expected = { ...mockUserId, id: '1', name: 'Bob' };
    fetchData.mockImplementation(() => {
      return expected
    });
    const thunk = fetchExistingUser(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(fetchFavorites(expected.id));
  });

  it('should dispatch setLoading(false)', async () => {
    const thunk = fetchExistingUser(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw { message: 'Error fetching data' }
    });
    const thunk = fetchExistingUser(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error logging in user. Please sign up or try again.'));
  });
});