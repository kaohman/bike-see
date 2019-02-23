import { fetchData } from './api';

describe('fetchData', () => {
  let path;

  beforeEach(() => {
    path = 'http://api.citybik.es/v2/networks';
  });

  it('should call fetch with the correct parameters', () => {
    window.fetch = jest.fn();
    fetchData(path);
    expect(window.fetch).toHaveBeenCalledWith(path);
  });

  it('should return a response object if everything is okay', async () => {
    const mockCities = {
      networks: [
        { name: 'Denver', stations: 26, id: 'denver' },
        { name: 'Capital Bikeshare', stations: 58, id: 'capital-bikeshare' }
      ]
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        ...mockCities
      }),
      ok: true
    }));
    const result = await fetchData(path)
    expect(result).toEqual(mockCities);
  });

  it('should throw an error if everything is not okay', async () => {
    const expected = Error('Error fetching data: Error posting data');
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      statusText: 'Error posting data',
      ok: false
    }));
    await expect(fetchData(path)).rejects.toEqual(expected);
  });
});