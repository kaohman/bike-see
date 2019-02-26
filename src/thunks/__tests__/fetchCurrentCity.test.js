import { fetchCurrentCity } from '../fetchCurrentCity';
import { setLoading, setError, setCurrentCity } from '../../actions';
import { fetchData } from '../../utils/api';
import { fetchStations } from '../fetchStations';
jest.mock('../../utils/api');
jest.mock('../fetchStations');

describe('fetchCurrentCity', () => {
  let mockDispatch;
  let mockUserId;
  let mockCity;

  beforeEach(() => {
    mockUserId = '1';
    mockCity = 'denver';
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = fetchCurrentCity(mockUserId);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = fetchCurrentCity(mockUserId);
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith(`http://localhost:3001/api/v1/users/1/city`, 'GET');
  });

  it('should dispatch setCurrentCity if response is ok', async () => {
    fetchData.mockImplementation(() => {
      return { city: mockCity }
    });
    const thunk = fetchCurrentCity(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentCity(mockCity));
  });

  it('should dispatch fetchStations if response is ok', async () => {
    fetchData.mockImplementation(() => {
      return { city: mockCity }
    });
    const thunk = fetchCurrentCity(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(fetchStations(mockUserId, mockCity));
  });

  it('should dispatch setLoading(false)', async () => {
    const thunk = fetchCurrentCity(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw { message: 'Error fetching data' }
    });
    const thunk = fetchCurrentCity(mockUserId);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching data'));
  });
});