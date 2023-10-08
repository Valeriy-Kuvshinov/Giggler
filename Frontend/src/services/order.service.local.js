
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'orders'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    createOrder
}
window.cs = orderService


async function query(filterBy = { txt: '', price: 0 }) {
    var orders = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     orders = orders.filter(order => regex.test(order.vendor) || regex.test(order.description))
    // }
    // if (filterBy.price) {
    //     orders = orders.filter(order => order.price <= filterBy.price)
    // }
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        // order.owner = userService.getLoggedinUser()
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

function getEmptyOrder() {
    return {
        buyerId: '',
        sellerId: '',
        orderedGigId: '',
        createdAt: Date.now(),
        price:0
    }
}

function createOrder(buyerId,sellerId,gigId,price){
    var order=getEmptyOrder()
    order.buyerId=buyerId
    order.sellerId=sellerId
    order.orderedGigId=gigId
    order.price=price
    return order
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




