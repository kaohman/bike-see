import { setLoading, setError, setCurrentCity } from '../actions';
import { fetchData } from '../utils/api';

export const putCurrentCity = (user_id, city) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await fetchData(`http://localhost:3001/api/v1/users/${user_id}/city`, 'PUT', { user_id, city });
      dispatch(setCurrentCity(city));
    } catch (error) {
      dispatch(setError('Error updating current city.'));
    }
    dispatch(setLoading(false));
  }
}