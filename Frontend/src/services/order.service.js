import { httpService } from './http.service.js'
import { gigService } from './gig.service.js'
import { userService } from './user.service.js'

const BASE_URL = 'order/'

export const orderService = {
    query,
    remove,
    save,
    createOrder,
    getById,
    getOrderDetails,
    getActionDate,
    getOrderClass,
    isOrderOverdue
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

function createOrder(buyerId = '', sellerId = '', title = 'important order', daysToMake = 'Express 24H', gigId = '', price = 99) {
    return {
        buyerId: buyerId,
        sellerId: sellerId,
        title: title,
        deliveryTime: daysToMake,
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

    if (role === 'buyer') userData = await userService.getById(order.buyerId)
    else if (role === 'seller') userData = await userService.getById(order.sellerId)

    return {
        ...order,
        gigData,
        userData
    }
}

function getActionDate(order) {
    let prefix = ''
    let dateStr = ''
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    let dateToUse

    if (order.orderState === 'reviewed') {
        prefix = 'Reviewed at'
        dateToUse = new Date(order.reviewedAt)
    } else if (order.orderState === 'completed') {
        prefix = 'Completed at'
        dateToUse = new Date(order.completedAt)
    } else if (order.orderState === 'denied') {
        prefix = 'Rejected at'
        dateToUse = new Date(order.deniedAt)
    } else if (order.orderState === 'accepted') {
        prefix = 'Accepted at'
        dateToUse = new Date(order.acceptedAt)
    } else if (order.orderState === 'pending') {
        prefix = 'Received at'
        dateToUse = new Date(order.createdAt)
    }

    // Common formatting for the date
    dateStr = months[dateToUse.getMonth()] + ' ' + (dateToUse.getDate())
    if (dateToUse.getDate() === 3 || dateToUse.getDate() === 23) {
        dateStr += 'rd'
    } else if (dateToUse.getDate() === 2 || dateToUse.getDate() === 22) {
        dateStr += 'nd'
    } else if (dateToUse.getDate() === 1 || dateToUse.getDate() === 21 || dateToUse.getDate() === 31) {
        dateStr += 'st'
    } else {
        dateStr += 'th'
    }

    return { prefix, dateStr }
}

function getOrderClass(orderState) {
    const orderStateClasses = {
        'pending': 'pending user-order',
        'accepted': 'accepted user-order',
        'denied': 'denied user-order',
        'completed': 'completed user-order',
        'reviewed': 'reviewed user-order'
    }
    return orderStateClasses[orderState] || ''
}

function isOrderOverdue(order) {
    if (order.orderState !== 'accepted') return false

    const acceptedAt = new Date(order.acceptedAt)
    let dueTime

    switch (order.deliveryTime) {
        case 'Express 24H':
            dueTime = 24 * 60 * 60 * 1000
            break;
        case 'Up to 3 days':
            dueTime = 3 * 24 * 60 * 60 * 1000
            break;
        case 'Up to 7 days':
            dueTime = 7 * 24 * 60 * 60 * 1000
            break;
        default:
            return false
    }
    const dueDate = new Date(acceptedAt.getTime() + dueTime)
    return dueDate < new Date()
}