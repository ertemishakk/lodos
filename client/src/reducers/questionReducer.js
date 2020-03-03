import {
    QUESTION_ERROR, POST_QUESTION, GET_QUESTIONS, VIEW_SIZE_UPDATED, QUESTION_FETCHING_FINISHED, UPDATE_POSITION, GET_SPECIFIC_QUESTION
    , GET_RANDOM_POSTS, GET_POPULAR_QUESTIONS, POST_ANSWER, GET_PROFILE_QUESTIONS, QUESTIONS_LOADING, CLEAR_QUESTIONS,
    STOP_QUESTION_FETCHING_ONMOUNT, CLEAR__SPECIFIC_QUESTIONS, DELETE_QUESTION, SET_QUERY, RESET_QUESTIONS
} from '../actions/types'

const initialState = {
    question: {},
    postquestion: {},
    allquestions: [],
    questionError: {},
    randomposts: [],
    popularquestions: [],
    profilequestions: [],
    questionsLoading: false,
    questionfetchingfinished: false,
    stopquestionfetching: false,
    position: 0,
    searchQuery: ''

}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESET_QUESTIONS:
            return {
                ...state,
                allquestions: []
            }
        case SET_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            }

        case DELETE_QUESTION:
            return {
                ...state
            }

        case CLEAR__SPECIFIC_QUESTIONS:
            return {
                ...state,
                question: {},


            }
        case GET_SPECIFIC_QUESTION:
            return {
                ...state,
                question: action.payload,
                questionsLoading: false

            }
        case UPDATE_POSITION:
            return {
                ...state,
                position: action.payload

            }

        case STOP_QUESTION_FETCHING_ONMOUNT:
            return {
                ...state,
                stopquestionfetching: true

            }

        case QUESTION_FETCHING_FINISHED:
            return {
                ...state,
                questionfetchingfinished: true,
                questionsLoading: false,

            }


        case QUESTIONS_LOADING:
            return {
                ...state,
                questionsLoading: true,

            }


        case GET_PROFILE_QUESTIONS:
            return {

                ...state,
                profilequestions: action.payload,
                questionsLoading: false
            }

        case POST_ANSWER:
            return {

                ...state,
                question: action.payload
            }
        case GET_POPULAR_QUESTIONS:
            return {

                ...state,
                popularquestions: action.payload
            }
        case POST_QUESTION:
            return {

                ...state,
                postquestion: action.payload,
                questionsLoading: false

            }
        case GET_RANDOM_POSTS:
            return {

                ...state,
                randomposts: action.payload
            }


        case QUESTION_ERROR:
            return {
                ...state,
                questionError: action.payload
            }


        case GET_QUESTIONS:

            return {
                ...state,
                allquestions: state.allquestions.concat(action.payload),
                questionsLoading: false,
            }
        case CLEAR_QUESTIONS:

            return {
                ...state,
                allquestions: [],
                questionfetchingfinished: false
            }

        case VIEW_SIZE_UPDATED:

            return {
                ...state,

            }
        default: return state;
    }
}