export const stationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STATIONS':
      return action.stations
    default:
      return state
  }
}