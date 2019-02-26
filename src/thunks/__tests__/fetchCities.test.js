import { fetchCities } from '../fetchCities';
import { setLoading, setError, setCities } from '../../actions';
import { fetchData } from '../../utils/api';
jest.mock('../../utils/api');

describe('fetchCities', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = fetchCities();
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = fetchCities();
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith('http://api.citybik.es/v2/networks', 'GET');
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw {message: 'Error fetching data'}
    });
    const thunk = fetchCities();
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching cities.'));
  });

  it('should dispatch setCities if response is ok', async () => {
    const expected = { networks: [
      { name: 'Denver', stations: 26, id: 'denver' },
      { name: 'Capital Bikeshare', stations: 58, id: 'capital-bikeshare' }
    ]};
    fetchData.mockImplementation(() => expected);
    const thunk = fetchCities();
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setCities(expected.networks));
  });

  it('should dispatch setLoading(false)', async () => {
    const expected = { networks: [
      { name: 'Denver', stations: 26, id: 'denver' },
      { name: 'Capital Bikeshare', stations: 58, id: 'capital-bikeshare' }
    ]};
    fetchData.mockImplementation(() => expected);
    const thunk = fetchCities();
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });
});