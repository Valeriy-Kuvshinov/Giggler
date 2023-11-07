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
    getOrderDetails,
    getActionDate,
    getDueDate,
    getOrderClass
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
        userData
    }
}

function getActionDate(order) {
    let prefix = ''
    let dateStr = ''
    const months=['January','February','March','April',
                  'May','June','July','August',
                  'September','October','November','December']

    if (order.orderState === 'completed') {
        // prefix = 'completed at '
        dateStr = new Date(order.completedAt).toLocaleDateString()
    }
    if (order.orderState === 'denied') {
        // prefix = 'rejected at '
        dateStr = new Date(order.deniedAt).toLocaleDateString()
    }
    if (order.orderState === 'accepted') {
        // prefix = 'accepted at '
        dateStr = new Date(order.acceptedAt).toLocaleDateString()
    }
    if (order.orderState === 'pending') {
        // prefix = 'received at '
        dateStr = new Date(order.createdAt).toLocaleDateString()
    }
    dateStr=months[new Date(order.createdAt).getMonth()]+' '+(new Date(order.createdAt).getDay()+1)
    if((new Date(order.createdAt).getDay()+1)===3 || (new Date(order.createdAt).getDay()+1)===23){
        dateStr+='rd'
    } else if((new Date(order.createdAt).getDay()+1)===2 || (new Date(order.createdAt).getDay()+1)===22){
        dateStr+='nd'
    } else if((new Date(order.createdAt).getDay()+1)===1 || (new Date(order.createdAt).getDay()+1)===21 || (new Date(order.createdAt).getDay()+1)===31){
        dateStr+='st'
    } else {
        dateStr+='th'
    }
    return prefix + dateStr
}

function getDueDate(acceptedDate, daysToMake) {
    let days = 0
    if (daysToMake === 'Express 24H') days = 1
    else if (daysToMake === 'Up to 3 days') days = 3
    else if (daysToMake === 'Up to 7 days') days = 7
    return new Date(acceptedDate.getTime() + days * 24 * 60 * 60 * 1000).toLocaleDateString()
}

function getOrderClass(orderState) {
    const orderStateClasses = {
        'pending': 'pending user-order',
        'accepted': 'accepted user-order',
        'denied': 'denied user-order',
        'completed': 'completed user-order'
    }
    return orderStateClasses[orderState] || ''
}