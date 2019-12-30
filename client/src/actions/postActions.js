import axios from 'axios'
import { HOUSING_POSTS, FORSALE_POSTS, POST_ERROR, GET_HOUSING_POSTS, GET_FORSALE_POSTS } from './types'

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
    axios.post('http://localhost:5000/api/posts/forsale', postData)
        .then(res => {
            dispatch({
                type: FORSALE_POSTS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: { msg: 'createForSalePost failed' }
        }))
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