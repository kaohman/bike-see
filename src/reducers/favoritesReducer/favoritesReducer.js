export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.favorite]
    case 'REMOVE_FAVORITE':
      const index = state.findIndex(id => id === action.favorite);
      let newFavorites;
      newFavorites = state.slice();
      newFavorites.splice(index, 1);
      return newFavorites
    case 'SET_FAVORITES':
      return action.favorites
    default:
      return state
  }
}