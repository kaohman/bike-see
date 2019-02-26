import { putCurrentCity } from '../putCurrentCity';
import { setLoading, setError, setCurrentCity } from '../../actions';
import { fetchData } from '../../utils/api';
jest.mock('../../utils/api');

describe('putCurrentCity', () => {
  let mockDispatch;
  let mockUserId;
  let mockCity;

  beforeEach(() => {
    mockUserId = '1';
    mockCity = 'denver';
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = putCurrentCity(mockUserId, mockCity);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = putCurrentCity(mockUserId, mockCity);
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith(`http://localhost:3001/api/v1/users/1/city`, 'PUT', { user_id: mockUserId, city: mockCity});
  });

  it('should dispatch setCurrentCity if response is ok', async () => {
    fetchData.mockImplementation(() => {
      return mockCity
    });
    const thunk = putCurrentCity(mockUserId, mockCity);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentCity(mockCity));
  });

  it('should dispatch setLoading(false)', async () => {
    const thunk = putCurrentCity(mockUserId, mockCity);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw { message: 'Error fetching data' }
    });
    const thunk = putCurrentCity(mockUserId, mockCity);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching data'));
  });
});