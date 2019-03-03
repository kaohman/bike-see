import { setLoading, setError, setCurrentCity } from '../actions';
import { fetchStations } from '../thunks/fetchStations';
import { fetchData } from '../utils/api';

export const fetchCurrentCity = (user_id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const fetchedCity = await fetchData(`http://localhost:3001/api/v1/users/${user_id}/city`, 'GET');
      if (fetchedCity.city.name) {
        dispatch(setCurrentCity(fetchedCity.city));
        dispatch(fetchStations(user_id, fetchedCity.city.id));
      }

    } catch (error) {
      dispatch(setError('Error getting current city.'));
    }
    dispatch(setLoading(false));
  }
}