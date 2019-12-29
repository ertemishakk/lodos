import { combineReducers } from 'redux'
import formReducer from './formReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    errors: errorReducer,
    form: formReducer
})