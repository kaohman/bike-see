import { fetchStations } from '../fetchStations';
import { setLoading, setError, setStations, setCurrentCity } from '../../actions';
import { fetchData } from '../../utils/api';
jest.mock('../../utils/api');

describe('fetchStations', () => {
  let mockDispatch;
  let mockCity

  beforeEach(() => {
    mockCity = 'Denver';
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = fetchStations(mockCity);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = fetchStations(mockCity);
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith(`http://api.citybik.es/v2/networks/${mockCity}`, 'GET');
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw {message: 'Error fetching data'}
    });
    const thunk = fetchStations(mockCity);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching data'));
  });

  it('should dispatch setStations if response is ok', async () => {
    const expected = {
      network: [
        { name: 'Denver', stations: 26, id: 'denver' },
        { name: 'Capital Bikeshare', stations: 58, id: 'capital-bikeshare' }
      ]
    };
    fetchData.mockImplementation(() => expected);
    const thunk = fetchStations(mockCity);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setStations(expected.networks));
  });

  it('should dispatch setCurrentCity if response is ok', async () => {
    const expected = {
      network: {
        stations: [
          { name: '1st & Broadway', bikes_available: 5, id: '1' },
          { name: '18th & Blake', bikes_available: 8, id: '2' }
        ]
      }
    };
    fetchData.mockImplementation(() => expected);
    const thunk = fetchStations(mockCity);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentCity(mockCity));
  });

  it('should dispatch setLoading(false)', async () => {
    const expected = {
      network: {
        stations: [
          { name: '1st & Broadway', bikes_available: 5, id: '1' },
          { name: '18th & Blake', bikes_available: 8, id: '2' }
        ]
      }
    };
    fetchData.mockImplementation(() => expected);
    const thunk = fetchStations(mockCity);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });
});