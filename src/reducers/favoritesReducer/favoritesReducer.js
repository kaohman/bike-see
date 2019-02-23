export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const index = state.findIndex(id => id === action.favorite);
      let newFavorites;
      if (index !== -1) {
        newFavorites = state.slice();
        newFavorites.splice(index, 1);
      } else {
        newFavorites = [...state, action.favorite]
      }
      return newFavorites
    default:
      return state
  }
}