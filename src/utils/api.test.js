import { fetchData } from './api';

describe('fetchData', () => {
  let path;
  let method;
  let data;

  beforeEach(() => {
    path = 'http://api.citybik.es/v2/networks';
    method = 'POST';
    data = { name: 'Karin', email: 'k@k', password: 'password'};
  });

  it('should call fetch with the correct parameters', () => {
    const mockOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    }
    window.fetch = jest.fn();
    fetchData(path, method, data);
    expect(window.fetch).toHaveBeenCalledWith(path, mockOptions);
  });

  it('should return a response object if everything is okay', async () => {
    method = 'GET';
    data = null;
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
    const result = await fetchData(path, method, data)
    expect(result).toEqual(mockCities);
  });

  it('should return nothing if everything is okay with a 204 status', async () => {
    data = null;
    method = 'DELETE';
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 204,
      ok: true
    }));
    const result = await fetchData(path, method, data)
    expect(result).toEqual(undefined);
  });

  it('should throw an error if everything is not okay', async () => {
    const expected = Error('Error posting data');
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      statusText: 'Error posting data',
      ok: false
    }));
    await expect(fetchData(path)).rejects.toEqual(expected);
  });
});