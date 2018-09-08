// Types
const SHOW_MODAL = 'SHOW_MODAL'

// Actions
export const showModal = payload => ({ type: SHOW_MODAL, ...payload })

// Reducers
const initialState = {}

export default function pageReducer(state = initialState, {type, ...action}){
  switch(type){
    case SHOW_MODAL: {
      return {
        show: true,
      }
    }
    default: return state
  }
}
