import { setLoading, setError, setStations } from '../actions';
import { fetchData } from '../utils/api';

export const fetchStations = (user_id, city) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const results = await fetchData(`http://api.citybik.es/v2/networks/${city}`, 'GET');
      dispatch(setStations(results.network.stations));
    } catch (error) {
      dispatch(setError('Error getting stations.'));
    }
    dispatch(setLoading(false));
  }
}