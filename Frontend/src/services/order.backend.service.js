import { utilService } from "./util.service.js"
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
const TODO_KEY = 'orderDB'
const BASE_URL = 'order/'
// var gFilterBy = 'all'
// _createOrders()

export const orderBackendService = {
    query,
    get,
    remove,
    save,
    createOrder,
    getById,
    addLabel
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}


function get(orderId) {
    return storageService.get(TODO_KEY, orderId)
        .then((order) => {
            return order
        })
}

function getById(orderId) {
    return httpService.get(BASE_URL + orderId)
}
function remove(orderId) {
    return httpService.delete(BASE_URL + orderId)
}

function save(order) {
    if (order._id) {
        console.log('changed order')
        return httpService.put(BASE_URL, order)
    } else {
        console.log('created order')
        return httpService.post(BASE_URL, order)
    }
}

function addLabel(){
    
}

// function getDefaultFilter() {
//     return { title: '', subject: '' }
// }


// function _createOrders() {
//     let orders = utilService.loadFromStorage(TODO_KEY)
//     if (!orders || !orders.length) {
//         orders = []
//         orders.push(_createOrder( 'bread jays', 200,['comfortable','bready'] ))
//         orders.push(_createOrder( 'breadBOT', 5,['fun','bready'],true ))
//         orders.push(_createOrder( 'bread glasses', 25,['sight assisting','bready',false] ))
//         utilService.saveToStorage(TODO_KEY, orders)
//         console.log('orders created')
//     }
// }

function _createOrder(name, price, labels, inStock) {
    const order = createOrder( name, price, labels, inStock )
    order._id = utilService.makeId()
    return order
}

function createOrder(buyerId='',buyerName='',sellerId='',gigId='',price=99) {
    return {
        buyerId: buyerId,
        buyerName:  buyerName,
        sellerId: sellerId,
        orderedGigId: gigId,
        price:price,
        createdAt: Date.now(),
        orderState: 'pending'
    }
}
