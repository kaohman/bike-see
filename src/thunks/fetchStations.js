import { setLoading, setError, setStations } from '../actions';
import { putCurrentCity } from './putCurrentCity';
import { fetchData } from '../utils/api';

export const fetchStations = (user_id, city) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const results = await fetchData(`http://api.citybik.es/v2/networks/${city}`, 'GET');
      user_id && dispatch(putCurrentCity(user_id, city));
      dispatch(setStations(results.network.stations));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
}