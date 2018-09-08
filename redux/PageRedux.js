// Types
const SET_PAGE_STORE = 'SET_PAGE_STORE'

// Actions
export const setPageStore = payload => ({ type: SET_PAGE_STORE, ...payload })

// Reducers
const initialState = {
  pathname: '',
  route: '',
  query: {},
  content: {},
}

export default function pageReducer(state = initialState, {type, ...action}){
  switch(type){
    case SET_PAGE_STORE: {
      return {
        route: action.route,
        pathname: action.pathname,
        query: action.query,
        content: action.content,
      }
    }
    default: return state
  }
}
