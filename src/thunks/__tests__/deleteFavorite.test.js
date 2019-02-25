import { deleteFavorite } from '../deleteFavorite';
import { setLoading, setError, removeFavorite } from '../../actions';
import { fetchData } from '../../utils/api';
jest.mock('../../utils/api');

describe('deleteFavorite', () => {
  let mockDispatch;
  let mockUserId;
  let mockStationId;

  beforeEach(() => {
    mockUserId = '1';
    mockStationId = '2';
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = deleteFavorite(mockStationId, mockUserId);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = deleteFavorite(mockStationId, mockUserId);
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith(`http://localhost:3001/api/v1/users/${mockUserId}/favorites/${mockStationId}`, 'DELETE');
  });

  it('should dispatch removeFavorite if response is ok', async () => {
    const thunk = deleteFavorite(mockStationId, mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(removeFavorite(mockStationId));
  });

  it('should dispatch setLoading(false)', async () => {
    const thunk = deleteFavorite(mockStationId, mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw { message: 'Error fetching data' }
    });
    const thunk = deleteFavorite(mockStationId, mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching data'));
  });
});