import { setCurrentUser, setLoading, setError } from '../actions';
import { fetchData } from '../utils/api';

export const fetchUser = (user, login) => {
  const url = login ? 'http://localhost:3001/api/v1/users' : 'http://localhost:3001/api/v1/users/new';
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const fetchedUser = await fetchData(url, 'POST', {name: user.name, email: user.email, password: user.password});
      dispatch(setCurrentUser(fetchedUser));
      localStorage.setItem('bike-user', JSON.stringify(fetchedUser));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
}

// fetchCity - GET
// postCity - POST
// putCity - PUT