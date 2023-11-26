import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'

const ORDERS_COLLECTION = 'order'

export const orderService = {
    query,
    remove,
    save,
    getById
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection(ORDERS_COLLECTION)
        const orders = await collection.find(criteria).toArray()

        return orders
    }
    catch (err) {
        loggerService.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection(ORDERS_COLLECTION)
        const order = collection.findOne({ _id: new ObjectId(orderId) })
        return order
    }
    catch (err) {
        loggerService.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection(ORDERS_COLLECTION)
        const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(orderId) })
        if (deletedCount === 0) {
            throw new Error(`Order with id ${orderId} was not found`)
        }
        return deletedCount
    }
    catch (err) {
        loggerService.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function save(order) {
    const collection = await dbService.getCollection(ORDERS_COLLECTION)

    try {
        const orderToSave = { ...order }

        if (order._id) {
            const id = new ObjectId(order._id)
            delete orderToSave._id

            _convertIdsToObjectIds(orderToSave)

            const response = await collection.updateOne({ _id: id }, { $set: orderToSave })
            if (response.matchedCount === 0) {
                throw new Error(`Order with id ${id.toHexString()} was not found`)
            }
            return { _id: id, ...orderToSave }
        } else {
            _convertIdsToObjectIds(orderToSave)

            const response = await collection.insertOne(orderToSave)
            return { ...orderToSave, _id: response.insertedId }
        }
    } catch (err) {
        loggerService.error(`cannot save order ${order._id}`, err)
        throw err
    }
}

function _convertIdsToObjectIds(orderData) {
    ['buyerId', 'sellerId', 'orderedGigId'].forEach(field => {
        if (orderData[field] && typeof orderData[field] === 'string') {
            orderData[field] = new ObjectId(orderData[field])
        }
    })
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy._id) criteria._id = filterBy._id
    return criteria
}