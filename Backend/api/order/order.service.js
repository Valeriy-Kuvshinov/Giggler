import fs from 'fs'
import { utilService } from './util.service.js'

const orders = utilService.readJsonFile('data/order.json')

export const orderService = {
    query,
    get,
    remove,
    save
}

function query() {
    let ordersToDisplay = [...orders]
    return Promise.resolve(ordersToDisplay)
}

function get(orderId) {
    const order = orders.find(order => order._id === orderId)
    if (!order) return Promise.reject('Order not found!')
    return Promise.resolve(order)
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
        newOrder.orderedGigId=order.gigId
        newOrder.price=order.price
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
