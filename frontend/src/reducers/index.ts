import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux'
import authReducer from '../redux/auth/userSlice'
import { connectRouter } from 'connected-react-router'

const history = createBrowserHistory()

export default combineReducers({
  auth: authReducer,
  router: connectRouter(history),
})
