import { removeFavorite, setLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const deleteFavorite = (station_id, user_id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await fetchData(`https://bike-see.herokuapp.com/api/v1/users/${user_id}/favorites/${station_id}`, 'DELETE');
      dispatch(removeFavorite(station_id));
    } catch (error) {
      dispatch(setError('Error deleting favorite.'));
    }
    dispatch(setLoading(false));
  }
}