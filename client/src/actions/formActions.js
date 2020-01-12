import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../setAuthToken'

export const registerUser = (userData, history) => dispatch => {
    axios.post('http://localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }))

}

export const loginUser = (userData) => dispatch => {
    axios.post('http://localhost:5000/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);

            setAuthToken(token);

            const decoded = jwt_decode(token);

            dispatch({
                type: SET_CURRENT_USER,
                payload: decoded
            })


        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}




export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
    window.location.href = '/login'
}