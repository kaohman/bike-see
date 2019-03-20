import { removeFavorite, setError } from '../actions';
import { fetchData } from '../utils/api';

export const deleteFavorite = (station_id, user_id) => {
  return async (dispatch) => {
    try {
      await fetchData(`/api/v1/users/${user_id}/favorites/${station_id}`, 'DELETE');
      dispatch(removeFavorite(station_id));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}