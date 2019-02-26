import { fetchUser } from '../fetchUser';
import { setLoading, setError, setCurrentUser } from '../../actions';
import { fetchData } from '../../utils/api';
import { fetchFavorites } from '../fetchFavorites';
import { fetchCurrentCity } from '../fetchCurrentCity';
jest.mock('../../utils/api');
jest.mock('../fetchCurrentCity');
jest.mock('../fetchFavorites');

describe('fetchUser', () => {
  let mockDispatch;
  let mockUser;

  beforeEach(() => {
    mockUser = { email: 'bob@bob', password: 'password' };
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = fetchUser(mockUser);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = fetchUser(mockUser);
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith(`http://localhost:3001/api/v1/users`, 'POST', mockUser);
  });

  it('should dispatch setCurrentUser if response is ok', async () => {
    const expected = { ...mockUser, id: '1', name: 'Bob' };
    fetchData.mockImplementation(() => {
      return expected
    });
    const thunk = fetchUser(mockUser);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentUser(expected));
  });

  it('should dispatch fetchFavorites if response is ok', async () => {
    const expected = { ...mockUser, id: '1', name: 'Bob' };
    fetchData.mockImplementation(() => {
      return expected
    });
    const thunk = fetchUser(mockUser);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(fetchFavorites(expected.id));
  });

  it('should dispatch fetchCurrentCity if response is ok', async () => {
    const expected = { ...mockUser, id: '1', name: 'Bob' };
    fetchData.mockImplementation(() => {
      return expected
    });
    const thunk = fetchUser(mockUser);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(fetchCurrentCity(expected.id));
  });

  it('should dispatch setLoading(false)', async () => {
    const thunk = fetchUser(mockUser);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw { message: 'Error fetching data' }
    });
    const thunk = fetchUser(mockUser);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error logging in user. Please sign up or try again.'));
  });
});