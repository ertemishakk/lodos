import axios from 'axios'
import {
    POST_QUESTION, QUESTION_ERROR, GET_QUESTIONS, VIEW_SIZE_UPDATED, GET_RANDOM_POSTS, UPDATE_POSITION, GET_SPECIFIC_QUESTION,
    GET_POPULAR_QUESTIONS, POST_ERROR, GET_PROFILE_QUESTIONS, QUESTIONS_LOADING, CLEAR_QUESTIONS, QUESTION_FETCHING_FINISHED,
    STOP_QUESTION_FETCHING_ONMOUNT, CLEAR__SPECIFIC_QUESTIONS, DELETE_QUESTION, SET_QUERY, RESET_QUESTIONS,
    GET_ERRORS
} from './types'


export const setQuery = (query) => dispatch => {
    dispatch({
        type: SET_QUERY,
        payload: query
    })
}


export const clearSpecificQuestion = () => dispatch => {
    dispatch({
        type: CLEAR__SPECIFIC_QUESTIONS
    })
}


export const sendDeleteQuestion = (questionid) => dispatch => {
    axios.delete(`/api/questions/deletequestion/${questionid}`)
        .then(() => {
            dispatch({
                type: DELETE_QUESTION
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

}
export const getSpecificQuestion = (questionid) => dispatch => {
    dispatch(questionsLoading())
    axios.get(`/api/questions/getSpecificQuestion/${questionid}`)
        .then(res => {
            dispatch({
                type: GET_SPECIFIC_QUESTION,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}


export const stopQuestionFetchingOnMount = () => dispatch => {
    dispatch({
        type: STOP_QUESTION_FETCHING_ONMOUNT
    })
}

export const questionsLoading = () => dispatch => {
    dispatch({
        type: QUESTIONS_LOADING
    })
}

export const updatePosition = (page) => dispatch => {
    dispatch({
        type: UPDATE_POSITION,
        payload: page
    })
}


export const getProfileQuestions = (userid) => dispatch => {
    dispatch(questionsLoading())
    axios.get(`/api/questions/getProfileQuestions/${userid}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_QUESTIONS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}


export const popularQuestions = (questionid) => dispatch => {
    axios.get(`/api/questions/getpopularquestions/${questionid}`)
        .then(res => {
            dispatch({
                type: GET_POPULAR_QUESTIONS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}


export const randomPosts = () => dispatch => {
    axios.get('/api/questions/getrandomposts')
        .then(res => {
            dispatch({
                type: GET_RANDOM_POSTS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: POST_ERROR,
            payload: err.response.data
        }))
}


export const postQuestion = (data) => dispatch => {
    dispatch(questionsLoading())
    axios.post('/api/questions/postquestions', data)
        .then(res => {
            dispatch({
                type: POST_QUESTION,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: QUESTION_ERROR,
            payload: err.response.data
        }))
}

export const getQuestions = (page, query) => dispatch => {
    dispatch(questionsLoading())
    axios.get('/api/questions/getquestions', { params: { page, query } })
        .then(res => {
            if (query !== '' && page === 0) {
                dispatch({
                    type: RESET_QUESTIONS
                })
                dispatch({
                    type: UPDATE_POSITION,
                    payload: 0
                })
            }
            if (res.data.length === 0) {
                dispatch({
                    type: QUESTION_FETCHING_FINISHED
                })

            }
            else if (res.data.length < 12) {
                dispatch({
                    type: QUESTION_FETCHING_FINISHED,
                })
                dispatch({
                    type: GET_QUESTIONS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: GET_QUESTIONS,
                    payload: res.data
                })
            }


        })
        .catch(err => dispatch({
            type: QUESTION_ERROR,
            payload: err.response.data
        }))
}


export const updateViews = (data) => dispatch => {
    axios.post('/api/questions/updateViews', data)
        .then(res => {
            dispatch({
                type: VIEW_SIZE_UPDATED,

            })
        })
        .catch(err => dispatch({
            type: QUESTION_ERROR,
            payload: err.response.data
        }))
}

export const clearQuestions = () => dispatch => {
    dispatch({
        type: CLEAR_QUESTIONS

    })
}