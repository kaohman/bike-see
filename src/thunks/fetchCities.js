import { setLoading, setError, setCities } from '../actions';
import { fetchData } from '../utils/api';

export const fetchCities = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const results = await fetchData('http://api.citybik.es/v2/networks');
      dispatch(setCities(results.networks));
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(setLoading(false));
  }
}