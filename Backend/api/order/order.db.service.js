import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const orderService = {
    query,
    remove,
    add,
    save,
    getById
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        const orders = await collection.find(criteria).toArray()

        console.log('order : ', orders)
        return orders
    }
    catch (err) {
        loggerService.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = collection.findOne({ _id: new ObjectId(orderId) })
        console.log('I AM HERE IN GET BY ID DB backend: ', order)
        return order
    } catch (err) {
        loggerService.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('order')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(orderId) }
        if (!loggedinUser.isAdmin) criteria.userId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        loggerService.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        const orderToAdd = {
            buyerId: new ObjectId(order.buyerId),
            sellerId: new ObjectId(order.sellerId),
            title: order.title,
            deliveryTime: order.deliveryTime,
            orderedGigId: new ObjectId(order.orderedGigId),
            price: order.price,
            createdAt: order.createdAt,
            orderState: order.orderState,
            reasonForDenial: order.reasonForDenial,
            deniedAt: order.deniedAt || '',
            acceptedAt: order.acceptedAt || '',
            completedAt: order.completedAt || ''
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd
    } catch (err) {
        loggerService.error('cannot insert order', err)
        throw err
    }
}

async function save(user) {
    try {
        const userToSave = {
            buyerId: new ObjectId(order.buyerId),
            sellerId: new ObjectId(order.sellerId),
            title: order.title,
            deliveryTime: order.deliveryTime,
            orderedGigId: new ObjectId(order.orderedGigId),
            price: order.price,
            createdAt: order.createdAt,
            orderState: order.orderState,
            reasonForDenial: order.reasonForDenial,
            deniedAt: order.deniedAt || '',
            acceptedAt: order.acceptedAt || '',
            completedAt: order.completedAt || ''
        }
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: new ObjectId(user._id) }, { $set: userToSave })
        return user
    } catch (err) {
        loggerService.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy._id) criteria._id = filterBy._id
    return criteria
}