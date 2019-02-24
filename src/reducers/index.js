import { combineReducers } from 'redux';
import { citiesReducer } from './citiesReducer/citiesReducer';
import { stationsReducer } from './stationsReducer/stationsReducer';
import { favoritesReducer } from './favoritesReducer/favoritesReducer';
import { errorReducer } from './errorReducer/errorReducer';
import { loadingReducer } from './loadingReducer/loadingReducer';
import { currentCityReducer } from './currentCityReducer/currentCityReducer';
import { userReducer } from './userReducer/userReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  stations: stationsReducer,
  cities: citiesReducer,
  error: errorReducer,
  loading: loadingReducer,
  currentCity: currentCityReducer,
  user: userReducer,
});

export default rootReducer;