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
    // console.log(order._id)
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

function _createOrder(name, price, labels, inStock) {
    const order = createOrder( name, price, labels, inStock )
    order._id = utilService.makeId()
    return order
}

function createOrder(buyerId='',buyerName='',sellerId='',title='important order',deliveryTime='2 days',gigId='',price=99) {
    return {
        buyerId: buyerId,
        buyerName:  buyerName,
        sellerId: sellerId,
        title: title,
        deliveryTime: deliveryTime,
        orderedGigId: gigId,
        price:price,
        createdAt: Date.now(),
        orderState: 'pending'
    }
}
