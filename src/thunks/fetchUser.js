import { setCurrentUser, setLoading, setError, setCurrentCity } from '../actions';
import { fetchStations } from '../thunks/fetchStations';
import { fetchData } from '../utils/api';

export const fetchUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const fetchedUser = await fetchData('http://localhost:3001/api/v1/users', 'POST', user);
      dispatch(setCurrentUser(fetchedUser));
      localStorage.setItem('bike-user', JSON.stringify(fetchedUser));
      const fetchedCity = await fetchData(`http://localhost:3001/api/v1/users/${fetchedUser.id}/city`, 'GET');

      if (fetchedCity !== '') {
        dispatch(setCurrentCity(fetchedCity.city));
        dispatch(fetchStations(fetchedCity.city));
      }
      
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
}