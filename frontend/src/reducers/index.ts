import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux'
import authReducer, { name as authKey} from '../redux/auth/userSlice'
import { reducerPath as checklistKey, checklistReducer as checklistReducer} from '../redux/checklist/checklistApi'
import { connectRouter } from 'connected-react-router'

const history = createBrowserHistory()

export default combineReducers({
  [authKey]: authReducer,
  [checklistKey]: checklistReducer,
  router: connectRouter(history),
})
