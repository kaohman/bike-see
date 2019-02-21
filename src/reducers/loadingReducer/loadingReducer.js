export const loadingReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.loading
    default:
      return state
  }
}