import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux'
import authReducer, { name as authKey} from '../redux/auth/userSlice'
import { connectRouter } from 'connected-react-router'
import { checklistReducer, reducerPath as checklistKey } from '../redux/checklist/checklistApi';

const history = createBrowserHistory()

export default combineReducers({
  [authKey]: authReducer,
  [checklistKey]: checklistReducer,
  router: connectRouter(history),
})
