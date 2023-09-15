import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux'
import authReducer, { name as authKey} from '../redux/auth/userSlice'
import { connectRouter } from 'connected-react-router'

const history = createBrowserHistory()

export default combineReducers({
  [authKey]: authReducer,
  router: connectRouter(history),
})
