export const citiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CITIES':
      return action.cities
    default:
      return state
  }
}