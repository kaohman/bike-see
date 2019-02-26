import { addFavorite, setLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const postFavorite = (station_id, user_id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await fetchData(`http://localhost:3001/api/v1/users/favorites/new`, 'POST', { user_id, station_id});
      dispatch(addFavorite(station_id));
    } catch (error) {
      dispatch(setError('Error adding favorite.'));
    }
    dispatch(setLoading(false));
  }
}
