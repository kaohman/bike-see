import { setCurrentUser, setLoading, setError } from '../actions';
import { fetchFavorites } from '../thunks/fetchFavorites';
import { fetchData } from '../utils/api';

export const fetchExistingUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const fetchedUser = await fetchData(`/api/v1/users/${id}`, 'GET');
      dispatch(setCurrentUser(fetchedUser));
      dispatch(fetchFavorites(fetchedUser.id));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
}