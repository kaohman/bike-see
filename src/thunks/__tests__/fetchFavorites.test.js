import { fetchFavorites } from '../fetchFavorites';
import { setLoading, setError, setFavorites } from '../../actions';
import { fetchData } from '../../utils/api';
jest.mock('../../utils/api');

describe('fetchFavorites', () => {
  let mockDispatch;
  let mockUserId;

  beforeEach(() => {
    mockUserId = '1';
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = fetchFavorites(mockUserId);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = fetchFavorites(mockUserId);
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith(`http://localhost:3001/api/v1/users/${mockUserId}/favorites`, 'GET');
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw { message: 'Error fetching data' }
    });
    const thunk = fetchFavorites(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching data'));
  });

  it('should dispatch setFavorites if response is ok', async () => {
    const expected = [
      { user_id: '1', station_id: '1'},
      { user_id: '1', station_id: '2' }
    ];
    fetchData.mockImplementation(() => expected);
    const thunk = fetchFavorites(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setFavorites(['1', '2']));
  });

  it('should dispatch setLoading(false)', async () => {
    const expected = [
      { user_id: '1', station_id: '1' },
      { user_id: '1', station_id: '2' }
    ];
    fetchData.mockImplementation(() => expected);
    const thunk = fetchFavorites(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });
});