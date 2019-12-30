import { combineReducers } from 'redux'
import formReducer from './formReducer'
import errorReducer from './errorReducer'
import postReducer from './postReducer'

export default combineReducers({
    errors: errorReducer,
    form: formReducer,
    post: postReducer

})