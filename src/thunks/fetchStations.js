import { setLoading, setError, setStations } from '../actions';
import { fetchData } from '../utils/api';

export const fetchCities = (path) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const results = await fetchData(`http://api.citybik.es/v2/networks/${path}`);
      dispatch(setStations(results.networks));
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(setLoading(false));
  }
}