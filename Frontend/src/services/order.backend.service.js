import { httpService } from './http.service.js'
const BASE_URL = 'order/'

export const orderBackendService = {
    query,
    remove,
    save,
    createOrder,
    getById,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
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

function createOrder(buyerId = '', sellerId = '', title = 'important order', deliveryTime = '2 days', gigId = '', price = 99) {
    return {
        buyerId: buyerId,
        sellerId: sellerId,
        title: title,
        deliveryTime: deliveryTime,
        orderedGigId: gigId,
        price: price,
        createdAt: Date.now(),
        reasonForDenial: '',
        orderState: 'pending'
    }
}