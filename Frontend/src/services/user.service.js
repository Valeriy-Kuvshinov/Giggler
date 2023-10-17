import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const SESSION_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'user/'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  setLoggedinUser,
  getUsers,
  getById,
  remove,
  update,
  getUserRatingCount,
}
window.userService = userService

function getUsers() {
  return httpService.get(BASE_URL)
}

async function getById(userId) {
  const user = await httpService.get(BASE_URL + userId)
  return user
}

function remove(userId) {
  return httpService.delete(BASE_URL, userId)
}

async function update(userId) {
  const user = await httpService.put(BASE_URL, userId)
  if (getLoggedinUser()._id === userId) setLoggedinUser(user)
  return user
}

async function login(userCred) {
  console.log('Attempting login with credentials:', userCred)
  const user = await httpService.post('auth/login', userCred)
  console.log('Logged in user:', user)
  if (user) {
    return setLoggedinUser(user)
  }
}

async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred)
  return setLoggedinUser(user)
}

async function logout() {
  try {
    await httpService.post('auth/logout')
    sessionStorage.removeItem(SESSION_KEY_LOGGEDIN_USER)
  } catch (err) {
    console.error('Cannot logout:', err)
    throw err
  }
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