import { setLoading, setError, setStations, setCurrentCity } from '../actions';
import { fetchData } from '../utils/api';

export const fetchStations = (user_id, city) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const results = await fetchData(`http://api.citybik.es/v2/networks/${city}`, 'GET');
      dispatch(setCurrentCity(city));
      await fetchData(`http://localhost:3001/api/v1/users/${user_id}/city`, 'PUT', {user_id , city});
      dispatch(setStations(results.network.stations));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
}