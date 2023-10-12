import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const SESSION_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'user'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser: setLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    getUserRatingCount,
}
window.userService = userService

function getUsers() {
    return storageService.query(BASE_URL)
}

async function getById(userId) {
    const user = await storageService.get(BASE_URL, userId)
    return user
}

function remove(userId) {
    return storageService.remove(BASE_URL, userId)
}

async function update(userId) {
    const user = await storageService.get(BASE_URL, userId)
    await storageService.put(BASE_URL, user)

    // // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) setLoggedinUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query(BASE_URL)
    const user = users.find((user) => user.username === userCred.username)
    if (user) {
        return setLoggedinUser(user)
    }
}

async function signup(userCred) {
    const user = await storageService.post(BASE_URL, userCred)
    return setLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(SESSION_KEY_LOGGEDIN_USER)
}

function setLoggedinUser(user) {
    sessionStorage.setItem(SESSION_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY_LOGGEDIN_USER))
}

function getUserRatingCount(user) {
    let countMax = 1000
    let countMin = 1
    switch (user.level) {
        case 'Level 1':
            countMax = 100
            break
        case 'Level 2':
            countMin = 101
            countMax = 500
            break
        case 'Level 3':
            countMin = 501
            break
        case 'Pro Talent':
            return '+1k'

        default:
            // console.log('NO LEVEL! :(')
            break
    }
    return utilService.getRandomIntInclusive(countMin, countMax)
}

const users = [
    {
        _id: 'u001',
        fullName: 'Peter Parker',
        avatar:
            'https://qph.cf2.quoracdn.net/main-qimg-9fde28d147c243b690bdf975f8474145-lq',
        username: 'peter123',
        password: '123',
        level: 'level 2',
        rating: 4.9,
        isAdmin: false
    },
    {
        _id: 'u002',
        fullName: 'Jane Doe',
        username: 'jane123',
        password: '123',
        avatar:
            'https://img.freepik.com/premium-photo/robot-face-with-green-eyes-black-face_14865-1671.jpg?w=2000',
        level: 'level 1',
        rating: 4.9,
        isAdmin: true
    },
]
_createUsers()

async function _createUsers() {
    localStorage.setItem('user', JSON.stringify(users))
}