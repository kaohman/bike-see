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

export const toggleFavorite = (favorite) => ({
  type: 'TOGGLE_FAVORITE',
  favorite,
});