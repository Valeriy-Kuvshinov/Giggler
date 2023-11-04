import { httpService } from './http.service.js'
import { gigService } from './gig.service.js'
import { userService } from './user.service.js'

const BASE_URL = 'order/'

export const orderBackendService = {
    query,
    remove,
    save,
    createOrder,
    getById,
    getOrderDetails
}

async function query(filterBy = {}) {
    const orders = await httpService.get(BASE_URL, filterBy)
    return orders
}

async function getById(orderId) {
    const order = await httpService.get(BASE_URL + orderId)
    return order
}

function remove(orderId) {
    return httpService.delete(BASE_URL + orderId)
}

function save(order) {
    if (order._id) return httpService.put(BASE_URL, order)
    else return httpService.post(BASE_URL, order)
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

async function getOrderDetails(orderId, role = 'buyer') {
    const order = await getById(orderId)
    const gigData = await gigService.getById(order.orderedGigId)
    let userData

    if (role === 'buyer') {
        userData = await userService.getById(order.buyerId)
    } else if (role === 'seller') {
        userData = await userService.getById(order.sellerId)
    }
    return {
        ...order,
        gigData,
        name: userData.fullName || '',
        avatar: userData.imgUrl || ''
    }
}