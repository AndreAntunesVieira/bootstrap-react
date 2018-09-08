import { isServer} from 'helpers/Environment'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import page from 'redux/PageRedux'
import modal from 'redux/ModalRedux'

const reducers = { page, modal }

const getCompose = () => isServer
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initStore = (initialState = {}) => createStore(
  combineReducers(reducers),
  initialState,
  getCompose()(applyMiddleware(thunkMiddleware))
)
