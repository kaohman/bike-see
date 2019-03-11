import { addFavorite, setError } from '../actions';
import { fetchData } from '../utils/api';

export const postFavorite = (station_id, user_id) => {
  return async (dispatch) => {
    try {
      await fetchData(`https://bike-see.herokuapp.com/api/v1/users/favorites/new`, 'POST', { user_id, station_id});
      dispatch(addFavorite(station_id));
    } catch (error) {
      dispatch(setError('Error adding favorite.'));
    }
  }
}
