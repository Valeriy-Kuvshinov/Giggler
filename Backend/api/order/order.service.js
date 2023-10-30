import fs from 'fs'
import { utilService } from '../../services/util.service.js'
import { loggerService } from '../../services/logger.service.js'

const ORDERS_PATH = 'data/order.json'

export const orderService = {
    query,
    getById,
    remove,
    save
}

function query(filterBy) {
    let ordersToDisplay = [...utilService.readJsonFile(ORDERS_PATH)]

    return Promise.resolve(ordersToDisplay)
}

function getById(orderId) {
    const orders = utilService.readJsonFile(ORDERS_PATH)
    const order = orders.find((order) => order._id === orderId)

    if (!order) {
        loggerService.error(`No order found with id ${orderId}`)
        throw new Error(`No order found with id ${orderId}`)
    }
    return Promise.resolve(order)
}

async function remove(orderId) {
    const orders = utilService.readJsonFile(ORDERS_PATH)
    const idx = orders.findIndex(order => order._id === orderId)
    
    if (idx === -1) {
        loggerService.error(`Failed to remove order with id ${orderId}`)
        throw new Error(`No order found with id ${orderId}`)
    }
    orders.splice(idx, 1)
    await _saveOrders(orders)
    return Promise.resolve()
}

async function save(order) {
    const orders = utilService.readJsonFile(ORDERS_PATH)
    
    if (order._id) {
        const idx = orders.findIndex(currOrder => currOrder._id === order._id)
        if (idx === -1) {
            loggerService.error(`Failed to update order with id ${order._id}`)
            throw new Error(`No order found with id ${order._id}`)
        }
        orders[idx] = { ...orders[idx], ...order }
    }
    else {
        order._id = utilService.makeId()
        orders.push(order)
    }
    await _saveOrders(orders)
    return Promise.resolve(order)
}

function _saveOrders(orders) {
    return new Promise((resolve, reject) => {
        const ordersStr = JSON.stringify(orders, null, 4)
        fs.writeFile(ORDERS_PATH, ordersStr, (err) => {
            if (err) {
                loggerService.error('Failed to save orders', err)
                reject(err)
            }
            else {
                loggerService.info('The orders were saved!')
                resolve()
            }
        })
    })
}