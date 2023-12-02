import { orderService } from "../services/order.service.js"
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS, SET_IS_LOADING, UPDATE_ORDER } from "./order.reducer.js"
import { store } from '../store/store.js'

export async function loadOrders(filterBy = {}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const orders = await orderService.query(filterBy)
        store.dispatch({ type: SET_ORDERS, orders })
    } catch (err) {
        console.error('Cannot load orders, here is why: ', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId);
        store.dispatch({ type: REMOVE_ORDER, orderId });
    } catch (err) {
        console.error('Cannot remove order', err);
        throw err;
    }
}

export async function saveOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        const actionType = savedOrder._id ? UPDATE_ORDER : ADD_ORDER
        store.dispatch({ type: actionType, order: savedOrder })
        return savedOrder
    } catch (err) {
        console.error('Cannot save order', err)
        throw err
    }
}