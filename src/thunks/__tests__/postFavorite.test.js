import { postFavorite } from '../postFavorite';
import { setLoading, setError, addFavorite } from '../../actions';
import { fetchData } from '../../utils/api';
jest.mock('../../utils/api');

describe('postFavorite', () => {
  let mockDispatch;
  let mockUserId;
  let mockStationId;

  beforeEach(() => {
    mockUserId = '1';
    mockStationId = '2';
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = postFavorite(mockStationId, mockUserId);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = postFavorite(mockStationId, mockUserId);
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith(`http://localhost:3001/api/v1/users/favorites/new`, 'POST', {user_id: mockUserId, station_id: mockStationId});
  });

  it('should dispatch addFavorite if response is ok', async () => {
    const thunk = postFavorite(mockStationId, mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(addFavorite(mockStationId));
  });

  it('should dispatch setLoading(false)', async () => {
    const thunk = postFavorite(mockStationId, mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw { message: 'Error fetching data' }
    });
    const thunk = postFavorite(mockStationId, mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error adding favorite.'));
  });
});