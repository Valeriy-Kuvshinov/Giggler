import { userService } from '../services/user.service.js'

export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null,
    isLoading: false
}

export function userReducer(state = initialState, action) {
    let newState = state
    let users
    switch (action.type) {
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case UPDATE_USER:
            users = state.users.map((user) =>
                user._id === action.user._id ? action.user : user
            )
            return { ...state, users }
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state, users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
    return newState
}