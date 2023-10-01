import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux'
import authReducer, { name as authKey} from '../redux/auth/userSlice'
import { reducerPath, checklistReducer } from '../redux/checklist/checklistApi'
import { reducerPath as checklistDashboardPath, checklistReducer as checklistDashboardReducer} from '../redux/dashboard/checklistDashboardApi'
import { connectRouter } from 'connected-react-router'

const history = createBrowserHistory()

export default combineReducers({
  [authKey]: authReducer,
  [reducerPath]: checklistReducer,
  [checklistDashboardPath]: checklistDashboardReducer,
  router: connectRouter(history),
})
