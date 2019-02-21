export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const index = state.findIndex(favorite => favorite.id === action.favorite.id);
      const newFavorites = index === -1 ? state.slice().splice(index, 1) : [...state, action.favorite]
      return newFavorites
    default:
      return state
  }
}