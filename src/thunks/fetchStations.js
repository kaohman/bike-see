import { setLoading, setError, setStations } from '../actions';
import { putCurrentCity } from './putCurrentCity';
import { fetchData } from '../utils/api';

export const fetchStations = (user_id, city) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const results = await fetchData(`http://api.citybik.es/v2/networks/${city}`, 'GET');
      const info = { id: city, city: results.network.location.city, country: results.network.location.country, name: results.network.name };
      user_id && dispatch(putCurrentCity(user_id, info));
      dispatch(setStations(results.network.stations));
    } catch (error) {
      dispatch(setError('Error getting stations.'));
    }
    dispatch(setLoading(false));
  }
}