import axios from 'axios'
import {
    HOUSING_POSTS, GET_PROFILE_POSTS,
    FORSALE_POSTS, POST_ERROR, GET_HOUSING_POSTS,
    GET_FORSALE_POSTS, GET_FORSALE_POSTS_BY_PRICE_ASC
    , GET_FORSALE_POSTS_BY_PRICE_DESC, GET_SINGLE_FORSALE_POST,LOADING
} from './types'


export const createHousingPost = (postData) => dispatch => {
    axios.post('http://localhost:5000/api/posts/housing', postData)
        .then(res => {
            dispatch({
                type: HOUSING_POSTS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: { msg: 'createHousingPost failed' }
        }))
}

export const createForSalePost = (postData) => dispatch => {
    dispatch(loading())
    axios.post('http://localhost:5000/api/posts/forsale', postData )
        .then(res => {
            dispatch({
                type: FORSALE_POSTS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}

export function loading(){
    return {
        type:LOADING
    }
}



export const getHousingPosts = () => dispatch => {
    axios.get('http://localhost:5000/api/posts/housing')
    
        .then(res => {
            dispatch({
                type: GET_HOUSING_POSTS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}


export const getForSalePosts = () => dispatch => {
    dispatch(loading())
    axios.get('http://localhost:5000/api/posts/forsale')
        .then(res => {
            dispatch({
                type: GET_FORSALE_POSTS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}


export const getForSalePostsAsc = () => dispatch => {
    axios.get('http://localhost:5000/api/posts/forsaleascending')
        .then(res => {
            dispatch({
                type: GET_FORSALE_POSTS_BY_PRICE_ASC,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}


export const getForSalePostsDes = () => dispatch => {
    axios.get('http://localhost:5000/api/posts/forsaledescending')
        .then(res => {
            dispatch({
                type: GET_FORSALE_POSTS_BY_PRICE_DESC,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}








export const getProfilePosts = (userid) => dispatch => {
    axios.get(`http://localhost:5000/api/posts/profileposts/${userid}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_POSTS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}

export const getSingleForsalePost = (postid) => dispatch => {
    axios.get(`http://localhost:5000/api/posts/forsaleposts/${postid}`)
        .then(res => {
            dispatch({
                type: GET_SINGLE_FORSALE_POST,
                payload: res.data
            })
        }).catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}