import {
    YELLOWPAGES_POST,
    POST_ERROR,
    GET_YELLOWPAGES_POST,
    GET_PROFILE_POSTS,
    STOP_YELLOWPAGES_FETCHING_ONMOUNT,
    LOADING,
    UPDATE_POST,
    GET_SPECIFIC_YELLOWPAGE,
    YELLOWPAGES_FETCHING_FINISHED,
    GET_STATES,
    GET_TOWNS,
    PHOTO_DELETED,
    STOP_LOADING,
    CLEAR_YELLOWPAGES,
    CLEAR_POST,
    UPDATE_YELLOWPAGES_POSITION
} from '../actions/types'

const initialState = {
    yellowpages: [],
    profileposts: {},
    post: {},
    postError: {},
    loading: false,
    states: [],
    stopFetchingOnMount: false,
    yellowpagefetchingfinished: false,
    updateSuccess: false,
    page: 0

}
export default function (state = initialState, action) {

    switch (action.type) {
        case UPDATE_YELLOWPAGES_POSITION:
            return {
                ...state,
                page: action.payload

            }

        case CLEAR_POST:
            return {
                ...state,
                post: {}

            }

        case YELLOWPAGES_FETCHING_FINISHED:
            return {
                ...state,
                yellowpagefetchingfinished: true,

            }

        case STOP_YELLOWPAGES_FETCHING_ONMOUNT:
            return {
                ...state,
                stopFetchingOnMount: true,

            }

        case UPDATE_POST:
            return {
                ...state,
                // post: action.payload,
                updateSuccess: true
            }
        case PHOTO_DELETED:
            return {
                ...state

            }
        case GET_TOWNS:
            return {
                ...state,
                [state.states[action.stateid]]: action.cities
            }
        case GET_STATES:
            return {
                ...state,
                states: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: true,

            }
        case STOP_LOADING:
            return {
                ...state,
                loading: false,

            }

        case YELLOWPAGES_POST:
            return {
                ...state,
                loading: false,
                post: action.payload,

            }
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                postError: action.payload
            }
        case GET_YELLOWPAGES_POST:
            return {
                ...state,
                stopFetchingOnMount: false,
                loading: false,
                yellowpages: state.yellowpages.concat(action.payload)
            }

        case CLEAR_YELLOWPAGES:
            return {
                ...state,
                yellowpages: []
            }

        case GET_PROFILE_POSTS:
            return {
                ...state,
                profileposts: action.payload,
                loading: false
            }

        case GET_SPECIFIC_YELLOWPAGE:
            return {
                ...state,
                loading: false,
                post: action.payload
            }


        default: return state;

    }
}