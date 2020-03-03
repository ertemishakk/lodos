import { SET_CURRENT_USER, VERIFY_USER } from '../actions/types'
import isEmpty from '../is-empty'


const initialState = {
    isAuthenticated: false,
    user: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            }

        case VERIFY_USER:
            return {
                ...state,
                verified: action.payload

            }


        default: return state;
    }
}