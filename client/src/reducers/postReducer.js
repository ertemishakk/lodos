import {
    HOUSING_POSTS, FORSALE_POSTS,
    POST_ERROR, GET_HOUSING_POSTS, GET_FORSALE_POSTS
    , GET_PROFILE_POSTS, GET_FORSALE_POSTS_BY_PRICE_ASC
    , GET_FORSALE_POSTS_BY_PRICE_DESC, GET_SINGLE_FORSALE_POST,LOADING
} from '../actions/types'
// import isEmpty from '../is-empty'

const initialState = {
    housingposts: [],
    forsaleposts: [],
    singleforsalepost: {},
    profileposts: {},
    post: {},
    postError: {},
    loading:false
    

}
export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
               
            }
        case HOUSING_POSTS:
            return {
               ...state,
                post: action.payload,
               
            }
        case FORSALE_POSTS:
            return {
                ...state,
                loading:false,
                post: action.payload,
               
            }
        case POST_ERROR:
            return {
                loading:false,
                postError: action.payload
            }
        case GET_HOUSING_POSTS:
            return {
                housingposts: action.payload
            }
        case GET_FORSALE_POSTS:
            return {
                loading:false,
                forsaleposts: action.payload
            }
        case GET_FORSALE_POSTS_BY_PRICE_ASC:
            return {
                forsaleposts: action.payload
            }
        case GET_FORSALE_POSTS_BY_PRICE_DESC:
            return {
                forsaleposts: action.payload
            }
        case GET_PROFILE_POSTS:
            return {
                profileposts: action.payload
            }
        case GET_SINGLE_FORSALE_POST:
            return {
                ...state,
                singleforsalepost: action.payload
            }
       
        default: return state;

    }
}