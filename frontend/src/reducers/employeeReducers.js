import {
    EMPLOYEE_LIST_REQUEST,
    EMPLOYEE_LIST_SUCCESS,
    EMPLOYEE_LIST_FAIL,
    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_SUCCESS,
    EMPLOYEE_DETAILS_FAIL,
    EMPLOYEE_UPDATE_REQUEST,
    EMPLOYEE_UPDATE_SUCCESS,
    EMPLOYEE_UPDATE_FAIL,
    EMPLOYEE_UPDATE_RESET,
    EMPLOYEE_CREATE_REQUEST,
    EMPLOYEE_CREATE_SUCCESS,
    EMPLOYEE_CREATE_FAIL,
    EMPLOYEE_CREATE_RESET,
    EMPLOYEE_DELETE_REQUEST,
    EMPLOYEE_DELETE_SUCCESS,
    EMPLOYEE_DELETE_FAIL
} from '../constants/employeeConstants'


export const employeeDetailsReducer = (state = { employee: {} }, action) => {
    switch(action.type) {
        case EMPLOYEE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case EMPLOYEE_DETAILS_SUCCESS:
            return {loading: false, employee: action.payload}
        case EMPLOYEE_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const employeeCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case EMPLOYEE_CREATE_REQUEST:
            return { loading: true }
        case EMPLOYEE_CREATE_SUCCESS:
            return { loading: false, employeeInfo: action.payload}
        case EMPLOYEE_CREATE_FAIL:
            return { loading: false, error: action.payload }
    }
}