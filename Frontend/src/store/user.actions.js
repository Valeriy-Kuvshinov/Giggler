import { socketService } from "../services/socket.service.js"
import { userService } from "../services/user.service.js"
import { store } from '../store/store.js'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, SET_IS_LOADING } from "./user.reducer.js"

export async function loadUsers() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users: users })
    } catch (err) {
        console.log('cannot load users, heres why:', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        console.log('Cannot load user', err)
    }
}

export async function loadWatchedUser(userId) {
    try {
        const watchedUser = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, watchedUser })
    } catch (err) {
        console.log('Cannot load user', err)
    }
}

export const updateUser = (updatedUser) => async (dispatch) => {
    try {
        const user = await userService.update(updatedUser)
        dispatch({ type: SET_USER, user })
    } catch (err) {
        console.error('UserActions: err in updateUser', err)
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        //socket tag
        socketService.emit('set-user-socket', user._id)
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
         //socket tag
         socketService.emit('set-user-socket', user._id)
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
         //socket tag
         socketService.emit('unset-user-socket')
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }
}

// methods using socket service
// export async function login(credentials) {
//     try {
//         const user = await userService.login(credentials)
//         store.dispatch({
//             type: SET_USER,
//             user
//         })
//         socketService.login(user)
//         return user
//     } catch (err) {
//         console.log('Cannot login', err)
//         throw err
//     }
// }

// export async function signup(credentials) {
//     try {
//         const user = await userService.signup(credentials)
//         store.dispatch({
//             type: SET_USER,
//             user
//         })
//         socketService.login(user)
//         return user
//     } catch (err) {
//         console.log('Cannot signup', err)
//         throw err
//     }
// }

// export async function logout() {
//     try {
//         await userService.logout()
//         store.dispatch({
//             type: SET_USER,
//             user: null
//         })
//         socketService.logout()
//     } catch (err) {
//         console.log('Cannot logout', err)
//         throw err
//     }
// }