import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.js'
import { loggerService } from '../../services/logger.service.js'

export const authService = {
    signup,
    login,
    getLoginToken,
    validateToken
}
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

async function login(username, password) {
    console.log(`Attempting to login user: ${username}`)
    loggerService.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    if (!user) throw new Error('Invalid username or password')

    const match = await bcrypt.compare(password, user.password)
    console.log("bcrypt comparison result:", match)
    if (!match) throw new Error('Invalid username or password')

    // delete user.password
    return user
}

async function signup(username, password, fullName, description = ''
    , balance = 0, level = 'level 0', rating = 0, imgUrl, isAdmin = false) {
    console.log(`Attempting to signup user: ${username}`)
    const saltRounds = 10

    if (!username || !password || !fullName || !imgUrl) throw new Error('Missing details')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.save({
        username,
        password: hash,
        fullName,
        description,
        balance,
        level,
        rating,
        imgUrl,
        createdAt:Date.now(),
        isAdmin
    })
}

function getLoginToken(user) {
    const userInfo = {
        _id: user._id,
        fullName: user.fullName,
        isAdmin: user.isAdmin
    }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}