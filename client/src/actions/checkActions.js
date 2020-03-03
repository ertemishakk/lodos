import {
    STOP_COMPONENT_RELOAD, RESTORE_COMPONENT_RELOAD
} from '../actions/types'

export const stopComponentReload = () => (dispatch) => {
    dispatch({
        type: STOP_COMPONENT_RELOAD
    })
}

export const restoreComponentReload = () => (dispatch) => {
    dispatch({
        type: RESTORE_COMPONENT_RELOAD
    })
}