import { setCurrentUser, setLoading, setError } from '../actions';
import { fetchFavorites } from '../thunks/fetchFavorites';
import { fetchData } from '../utils/api';

export const fetchExistingUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const fetchedUser = await fetchData(`https://bike-see.herokuapp.com/api/v1/users/${id}`, 'GET');
      dispatch(setCurrentUser(fetchedUser));
      dispatch(fetchFavorites(fetchedUser.id));
    } catch (error) {
      dispatch(setError('Error logging in user. Please sign up or try again.'));
    }
    dispatch(setLoading(false));
  }
}