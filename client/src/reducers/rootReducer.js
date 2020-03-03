import { combineReducers } from 'redux'
import formReducer from './formReducer'
import errorReducer from './errorReducer'
import postReducer from './postReducer'
import questionReducer from './questionReducer'
import checkReducer from './checkReducer'

export default combineReducers({
    errors: errorReducer,
    form: formReducer,
    post: postReducer,
    question: questionReducer,
    check: checkReducer

})