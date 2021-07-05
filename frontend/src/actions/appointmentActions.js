
import axios from 'axios'
import {
    APPOINTMENT_CREATE_SUCCESS,
    APPOINTMENT_CREATE_FAIL,
    APPOINTMENT_CREATE_REQUEST,
    APPOINTMENT_CREATE_RESET,
    APPOINTMENT_LIST_REQUEST,
    APPOINTMENT_LIST_SUCCESS,
    APPOINTMENT_LIST_FAIL,
    APPOINTMENT_DETAILS_REQUEST,
    APPOINTMENT_DETAILS_SUCCESS,
    APPOINTMENT_DETAILS_FAIL,
    APPOINTMENT_CANCEL_REQUEST,
    APPOINTMENT_CANCEL_SUCCESS,
    APPOINTMENT_CANCEL_FAIL,
    APPOINTMENT_UPDATE_REQUEST,
    APPOINTMENT_UPDATE_SUCCESS,
    APPOINTMENT_UPDATE_FAIL,
    APPOINTMENT_UPDATE_RESET
} from '../constants/appointmentConstants'

export const listAppointments = (keyword = '', pageNumber = '') => async (
    dispatch
) => {
    try {
        dispatch({ type: APPOINTMENT_LIST_REQUEST})
        
        const { data } = await axios.get(
            `/api/appointments?keyword=${keyword}&pageNumber=${pageNumber}`
        )

        dispatch({
            type: APPOINTMENT_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: APPOINTMENT_LIST_FAIL,
            payload: 
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
        })
    }
}


export const listAppointmentsDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: APPOINTMENT_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/appointments/${id}`)

        dispatch({
            type: APPOINTMENT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({
            type: APPOINTMENT_DETAILS_FAIL,
            payload:
                error.response && error.message.data.message
                  ? error.response.data.message
                  : error.message,
        })
    }
}


export const cancelAppointment = (id) => async (dispatch) => {
    try {
        dispatch({
            type: APPOINTMENT_CANCEL_REQUEST
        })

        const {
            userLogin: {userLogin},
        } = getState()

        const config = {
            headers: {
                Autorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/appointments/${id}`, config)

        dispatch({
            type: APPOINTMENT_CANCEL_SUCCESS,
        })
    } catch(error) {
        const message = 
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        dispatch({
            type: APPOINTMENT_CANCEL_FAIL,
            payload: message
        })
    }
}


export const createAppointment = () => async (dispatch) => {
    try {
        dispatch({
            type: APPOINTMENT_CREATE_REQUEST,
        })

        const { data } = await axios.post(`/api/appointments`, {})

        dispatch({
            type: APPOINTMENT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: APPOINTMENT_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message
        })
        
    }
}