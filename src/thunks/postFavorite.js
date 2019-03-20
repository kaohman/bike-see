import { addFavorite, setError } from '../actions';
import { fetchData } from '../utils/api';

export const postFavorite = (station_id, user_id) => {
  return async (dispatch) => {
    try {
      await fetchData('/api/v1/users/favorites', 'POST', { user_id, station_id});
      dispatch(addFavorite(station_id));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}
