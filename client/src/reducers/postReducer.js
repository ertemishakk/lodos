import { HOUSING_POSTS, FORSALE_POSTS, POST_ERROR, GET_HOUSING_POSTS, GET_FORSALE_POSTS } from '../actions/types'
// import isEmpty from '../is-empty'

const initialState = {
    housingposts: [],
    forsaleposts: [],
    post: {},
    postError: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case HOUSING_POSTS:
            return {
                ...state,
                post: action.payload,
                housingposts: [action.payload, ...state.housingposts]
            }
        case FORSALE_POSTS:
            return {
                ...state,
                post: action.payload,
                forsaleposts: [action.payload, ...state.forsaleposts]
            }
        case POST_ERROR:
            return {
                ...state,
                post: null,
                postError: action.payload
            }
        case GET_HOUSING_POSTS:
            return {
                ...state,
                housingposts: action.payload
            }
        case GET_FORSALE_POSTS:
            return {
                ...state,
                forsaleposts: action.payload
            }
        default: return state;

    }
}