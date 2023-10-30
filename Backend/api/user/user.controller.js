import { userService } from './user.service.js'
import { loggerService } from '../../services/logger.service.js'

export async function getUsers(req, res) {
    try {
        const filterBy = req.query.filterBy || {}
        const sort = req.query.sort || {}

        const sortDirection = sort.asc === 'true' ? 1 : -1
        const sortBy = { [sort.by || 'name']: sortDirection }

        const users = await userService.query(filterBy, sortBy)
        res.json(users)
    }
    catch (err) {
        console.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

export async function getUserById(req, res) {
    try {
        const userId = req.params.id
        var user = await userService.getById(userId)
        console.log('user to show: ', JSON.stringify(user, null, 2))
        res.json(user)
    }
    catch (err) {
        loggerService.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

export async function addUser(req, res) {
    try {
        const user = req.body
        const addedUser = await userService.save(user)
        res.json(addedUser)
    }
    catch (err) {
        loggerService.error('Failed to add user', err)
        res.status(500).send({ err: 'Failed to add user' })
    }
}

export async function updateUser(req, res) {
    try {
        const user = req.body
        console.log("Updating user:", user)
        const updatedUser = await userService.save(user)
        res.json(updatedUser)
    }
    catch (err) {
        loggerService.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

export async function removeUser(req, res) {
    try {
        const userId = req.params.id
        await userService.remove(userId)
        res.send()
    }
    catch (err) {
        loggerService.error('Failed to remove user', err)
        res.status(500).send({ err: 'Failed to remove user' })
    }
}