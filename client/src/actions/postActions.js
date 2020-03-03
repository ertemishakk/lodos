import axios from 'axios'
import {
    YELLOWPAGES_POST,
    GET_PROFILE_POSTS,
    POST_ERROR,
    GET_YELLOWPAGES_POST,
    LOADING,
    PHOTO_DELETED,
    STOP_YELLOWPAGES_FETCHING_ONMOUNT,
    UPDATE_POST, CLEAR_YELLOWPAGES,
    GET_SPECIFIC_YELLOWPAGE,
    GET_ERRORS,
    GET_STATES,
    GET_TOWNS,
    STOP_LOADING,
    YELLOWPAGES_FETCHING_FINISHED,
    CLEAR_POST,
    UPDATE_YELLOWPAGES_POSITION
} from './types'

export const updatePage = (page) => dispatch => {
    dispatch({
        type: UPDATE_YELLOWPAGES_POSITION,
        payload: page
    })
}

export const clearPost = () => dispatch => {
    dispatch({
        type: CLEAR_POST
    })
}

export const stopFetchingOnLoad = () => dispatch => {
    dispatch({
        type: STOP_YELLOWPAGES_FETCHING_ONMOUNT
    })
}

export const clearYellowPages = () => dispatch => {
    dispatch({
        type: CLEAR_YELLOWPAGES
    })
}

export const updatePost = (postData) => dispatch => {
    dispatch(loading())
    axios.post('http://localhost:5000/api/posts/updatepost', postData)
        .then(res => {
            dispatch({
                type: UPDATE_POST,
                // payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}

export const createYellowPagesPost = (category, postData) => dispatch => {
    axios.post(`http://localhost:5000/api/posts/${category}`, postData)
        .then(res => {
            dispatch({
                type: YELLOWPAGES_POST,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}

export function loading() {
    return {
        type: LOADING
    }
}

export const getYellowPages = (category, filter, page) => dispatch => {

    let params = {}

    params.state = filter.state
    params.city = filter.city
    params.page = page
    params.sortby = filter.sortby

    if (filter.subcategory) {
        params.subcategory = filter.subcategory
    }

    if (filter.minprice) {
        params.minprice = filter.minprice
    }
    if (filter.maxprice) {
        params.maxprice = filter.maxprice
    }
    if (filter.make) {
        params.make = filter.make
    }
    if (filter.minyear) {
        params.minyear = filter.minyear
    }
    if (filter.maxyear) {
        params.maxyear = filter.maxyear
    }
    if (filter.minkm) {
        params.minkm = filter.minkm
    }
    if (filter.maxkm) {
        params.maxkm = filter.maxkm
    }
    if (filter.often) {
        params.often = filter.often
    }


    dispatch(loading())
    axios.get(`http://localhost:5000/api/posts/${category}`, {
        params
    })
        .then(res => {
            if (res.data.length === 0) {
                dispatch({
                    type: YELLOWPAGES_FETCHING_FINISHED
                })
                dispatch({
                    type: STOP_LOADING
                })
            }
            else if (res.data.length < 12) {
                dispatch({
                    type: GET_YELLOWPAGES_POST,
                    payload: res.data
                })
                dispatch({
                    type: YELLOWPAGES_FETCHING_FINISHED
                })

            }
            else {
                dispatch({
                    type: GET_YELLOWPAGES_POST,
                    payload: res.data
                })
            }

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}






export const getProfilePosts = (userid) => dispatch => {
    dispatch(loading())
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



export const getStates = (category) => dispatch => {
    let categorystate = ''
    if (category === 'forsale') {
        categorystate = 'forsalestates'
    }
    if (category === 'housing') {
        categorystate = 'housingstates'
    }
    if (category === 'jobs') {
        categorystate = 'jobsstates'
    }
    if (category === 'garagesale') {
        categorystate = 'garagesalestates'
    }
    if (category === 'free') {
        categorystate = 'freestates'
    }
    if (category === 'events') {
        categorystate = 'eventsstates'
    }
    if (category === 'volunteers') {
        categorystate = 'volunteersstates'
    }
    if (category === 'classes') {
        categorystate = 'classesstates'
    }
    if (category === 'lostandfound') {
        categorystate = 'lostandfoundstates'
    }
    if (category === 'services') {
        categorystate = 'servicesstates'
    }

    axios.get(`http://localhost:5000/api/posts/${categorystate}`)
        .then(res => {
            dispatch({
                type: GET_STATES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({

                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getTowns = (category, stateinfo, stateid) => dispatch => {
    let categorytown = ''
    if (category === 'forsale') {
        categorytown = 'forsaletowns'
    }
    if (category === 'housing') {
        categorytown = 'housingtowns'
    }
    if (category === 'jobs') {
        categorytown = 'jobstowns'
    }
    if (category === 'garagesale') {
        categorytown = 'garagesaletowns'
    }
    if (category === 'free') {
        categorytown = 'freetowns'
    }
    if (category === 'events') {
        categorytown = 'eventstowns'
    }
    if (category === 'classes') {
        categorytown = 'classestowns'
    }
    if (category === 'volunteers') {
        categorytown = 'volunteerstowns'
    }
    if (category === 'lostandfound') {
        categorytown = 'lostandfoundtowns'
    }
    if (category === 'services') {
        categorytown = 'servicestowns'
    }
    axios.get(`http://localhost:5000/api/posts/${categorytown}/${stateinfo}`)
        .then(res => {
            dispatch({
                type: GET_TOWNS,
                stateid: stateid,
                cities: res.data
            })
        })
        .catch(err => {
            dispatch({

                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}


export const deletePhotos = (data) => dispatch => {


    axios.delete('http://localhost:5000/api/posts/deletephotos', {
        params: {
            link: data.link,
            postid: data.postid,
            category: data.category,
            userid: data.userid
        }
    })
        .then(res => {
            dispatch({
                type: PHOTO_DELETED
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response
        }))
}



export const deletePost = (postinfo) => dispatch => {
    axios.delete('http://localhost:5000/api/posts/deletepost', {
        params: {
            category: postinfo.category,
            postid: postinfo.postid,
            userid: postinfo.userid,
            links: postinfo.links
        }
    })
        .then(res => {
            dispatch({
                type: GET_PROFILE_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        })
}


export const getSpecificPost = (category, postid) => dispatch => {
    dispatch(loading())
    axios.get(`http://localhost:5000/api/posts/${category}/${postid}`)
        .then(res => {
            console.log(res)

            dispatch({
                type: GET_SPECIFIC_YELLOWPAGE,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: POST_ERROR,
                payload: err.response
            })
        })
}


