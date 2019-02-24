import { setCurrentUser, setFavorites, setLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const fetchUser = (user, login) => {
  const url = login ? 'http://localhost:3001/api/v1/users' : 'http://localhost:3001/api/v1/users/new';
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const fetchedUser = await fetchData(url, 'POST', {...user});
      dispatch(setCurrentUser(fetchedUser));
      if (login) {
        const favorites = await fetchData(`http://localhost:3001/api/v1/users/${fetchedUser.id}`, 'GET');
        dispatch(setFavorites(favorites));
      }
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(setLoading(false));
  }
}