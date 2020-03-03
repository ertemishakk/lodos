import {
    STOP_COMPONENT_RELOAD, RESTORE_COMPONENT_RELOAD
} from '../actions/types'

const initialState = {
    stopComponentReload: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case STOP_COMPONENT_RELOAD:
            return {
                ...state,
                stopComponentReload: true
            }
        case RESTORE_COMPONENT_RELOAD:
            return {
                ...state,
                stopComponentReload: false
            }
        default: return state;
    }
}