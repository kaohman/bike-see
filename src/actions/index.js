export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  loading,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error,
});

export const setCities = (cities) => ({
  type: 'SET_CITIES',
  cities,
});

export const setCurrentCity = (city) => ({
  type: 'SET_CURRENT_CITY',
  city,
});

export const setStations = (stations) => ({
  type: 'SET_STATIONS',
  stations,
});

export const addFavorite = (favorite) => ({
  type: 'ADD_FAVORITE',
  favorite,
});

export const removeFavorite = (favorite) => ({
  type: 'REMOVE_FAVORITE',
  favorite,
});

export const setFavorites = (favorites) => ({
  type: 'SET_FAVORITES',
  favorites,
});

export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  user,
});