import { setLoading, setError, setCities } from '../actions';
import { fetchData } from '../utils/api';

export const fetchCities = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const results = await fetchData('https://api.citybik.es/v2/networks', 'GET');
      dispatch(setCities(results.networks));
    } catch (error) {
      dispatch(setError('Error fetching cities.'));
    }
    dispatch(setLoading(false));
  }
}