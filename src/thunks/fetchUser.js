import { setCurrentUser, setLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const fetchUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const fetchedUser = await fetchData('http://localhost:3001/api/v1/users', 'POST', user);
      dispatch(setCurrentUser(fetchedUser));
      localStorage.setItem('bike-user', JSON.stringify(fetchedUser));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
}