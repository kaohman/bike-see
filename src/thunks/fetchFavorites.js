import { setFavorites, setLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const fetchFavorites = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const favorites = await fetchData(`http://localhost:3001/api/v1/users/${id}/favorites`, 'GET');
      const favoriteStations = favorites.map(favorite => favorite.station_id);
      dispatch(setFavorites(favoriteStations));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
}
  