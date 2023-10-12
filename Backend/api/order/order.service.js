import fs from 'fs'
import { utilService } from '../../services/util.service.js'
import { loggerService } from '../../services/logger.service.js'

const orders = utilService.readJsonFile('data/order.json')

export const orderService = {
    query,
    getById,
    remove,
    save
}

function query(filterBy) {
    let ordersToDisplay = [...orders]
    if(filterBy.id!=='') {
        ordersToDisplay=ordersToDisplay.filter((order)=>
        order.sellerId===filterBy.id)
    }
    return Promise.resolve(ordersToDisplay)
}

function getById(orderId) {
    var orders = [...orders]
    // console.log('orders',orders)
    console.log('orderId',orderId)
    orders = orders.filter((order) => {
        console.log( order.sellerId.localeCompare(orderId))
        if(order.sellerId.localeCompare(orderId)===0) {
            return true 
        }
        return false
    })
    console.log('orders',orders)
    if (!orders) {
        loggerService.error(`No order found with id ${orderId}`)
        throw new Error(`No order found with id ${orderId}`)
    }
    return Promise.resolve(orders)
}

function remove(orderId) {
    const idx = orders.findIndex(order => order._id === orderId)
    if (idx === -1) return Promise.reject('No Such Order')
    // const order = orders[idx]
    // if (order.owner._id !== loggedinUser._id) return Promise.reject('Not your order')
    orders.splice(idx, 1)
    return _saveOrdersToFile()
}

function save(order) {
    if (order._id) {
        const newOrder = orders.find(currOrder => currOrder._id === order._id)
        // if (orderToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your order')
        newOrder.buyerId=order.buyerId
        newOrder.buyerName=order.buyerName
        newOrder.sellerId=order.sellerId
        newOrder.orderedGigId=order.orderedGigId
        newOrder.price=order.price
        newOrder.orderState=order.orderState
    } else {
        order._id = _makeId()
        // order.owner = loggedinUser
        orders.push(order)
    }

    return _saveOrdersToFile().then(() => order)
    // return Promise.resolve(order)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveOrdersToFile() {
    return new Promise((resolve, reject) => {

        const ordersStr = JSON.stringify(orders, null, 4)
        fs.writeFile('data/order.json', ordersStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}
