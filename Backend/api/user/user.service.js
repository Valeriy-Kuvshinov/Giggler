import fs from 'fs'
import { utilService } from '../../services/util.service.js'
import { loggerService } from '../../services/logger.service.js'

const USERS_PATH = 'data/user.json'

export const userService = {
    remove,
    query,
    getById,
    getByUsername,
    save
}

function query() {
    let usersToDisplay = [...utilService.readJsonFile(USERS_PATH)]
    return Promise.resolve(usersToDisplay)
}

function getById(userId) {
    let users = utilService.readJsonFile(USERS_PATH)
    const user = users.find(g => g._id === userId)

    if (!user) {
        loggerService.error(`No user found with id ${userId}`)
        throw new Error(`No user found with id ${userId}`)
    }
    return Promise.resolve(user)
}

function getByUsername(username) {
    const users = utilService.readJsonFile(USERS_PATH)
    const user = users.find(u => u.username === username)

    if (!user) {
        loggerService.error(`No user found with username ${username}`)
        throw new Error(`No user found with username ${username}`)
    }
    return Promise.resolve(user)
}

function remove(userId) {
    let users = utilService.readJsonFile(USERS_PATH)
    const idx = users.findIndex(u => u._id === userId)

    if (idx === -1) {
        loggerService.error(`Failed to remove user with id ${userId}`)
        throw new Error(`No user found with id ${userId}`)
    }
    users.splice(idx, 1)
    _saveUsers(users)
    loggerService.info(`User with id ${userId} removed successfully`)
    return Promise.resolve()
}

function save(user) {
    let users = utilService.readJsonFile(USERS_PATH)

    if (user._id) {
        const idx = users.findIndex(u => u._id === user._id)
        if (idx === -1) {
            loggerService.error(`Failed to update user with id ${user._id}`)
            throw new Error(`No user found with id ${user._id}`)
        }
        users[idx] = { _id: user._id, ...user }
    } else {
        user._id = utilService.makeId()
        users.push({ _id: user._id, ...user })
    }
    _saveUsers(users)
    return Promise.resolve(user)
}

function _saveUsers(users) {
    try {
        // console.log("Users before saving: ", users)
        fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2))
        loggerService.info('Users saved successfully')
    } catch (err) {
        loggerService.error('Failed to save users', err)
    }
}