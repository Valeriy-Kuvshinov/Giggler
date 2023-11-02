import {dbService} from '../../services/db.service.js'
import {loggerService} from '../../services/logger.service.js'
import {asyncLocalStorage} from '../../services/als.service.js'

import mongodb from 'mongodb'
const {ObjectId} = mongodb

export const userService = {
    query,
    remove,
    add,
    save
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('user')
        const users = await collection.find(criteria).toArray()
        // console.log(users)
        // var users = await collection.aggregate([
        //     {
        //         $match: criteria
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'userId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     }
        // ]).toArray()
        // users = users.map(user => {
        //     user.byUser = { _id: user.byUser._id, username: user.byUser.username
        //         , country: user.byUser.country, imgUrl: user.byUser.imgUrl }
        //     return user
        // })

        return users
    } catch (err) {
        loggerService.error('cannot find users', err)
        throw err
    }

}

async function remove(userId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('user')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(userId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const {deletedCount} = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        loggerService.error(`cannot remove user ${userId}`, err)
        throw err
    }
}


async function add(user) {
    try {
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullName: user.fullName,
            description: user.description,
            balance: user.balance,
            level: user.level,
            rating: user.rating,
            imgUrl: user.imgUrl,
            country: user.country,
            languages:[],
            skills:[],
            education:[],
            createdAt: user.createdAt,
            isAdmin: user.isAdmin,
            lastDelivery: user.lastDelivery
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        loggerService.error('cannot insert user', err)
        throw err
    }
}

async function save(user) {
    try {
        const userToSave = {
            username: user.username,
            password: user.password,
            fullName: user.fullName,
            description: user.description,
            balance: user.balance,
            level: user.level,
            rating: user.rating,
            imgUrl: user.imgUrl,
            country: user.country,
            languages:[],
            skills:[],
            education:[],
            createdAt: user.createdAt,
            isAdmin: user.isAdmin,
            lastDelivery: user.lastDelivery
        }
        const collection = await dbService.getCollection('gigglerDB')
        await collection.updateOne({ _id: new ObjectId(user._id) }, { $set: userToSave })
        return user
    } catch (err) {
        loggerService.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.userId) criteria.userId = filterBy.userId
    return criteria
}



