import { setCurrentUser, setLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const postUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const fetchedUser = await fetchData('https://bike-see.herokuapp.com/api/v1/users/new', 'POST', user);
      dispatch(setCurrentUser(fetchedUser));
      localStorage.setItem('bike-user', JSON.stringify(fetchedUser));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
}