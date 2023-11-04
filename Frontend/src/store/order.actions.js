import { orderBackendService } from "../services/order.backend.service.js"
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS, SET_IS_LOADING, UPDATE_ORDER } from "./order.reducer.js"

export const loadOrders = (filterBy = {}) => async (dispatch) => {
    dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const orders = await orderBackendService.query(filterBy)
        dispatch({ type: SET_ORDERS, orders });
    } catch (err) {
        console.error('Cannot load orders, here is why: ', err)
    } finally {
        dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export const removeOrder = (orderId) => async (dispatch) => {
    try {
        await orderBackendService.remove(orderId)
        dispatch({ type: REMOVE_ORDER, orderId })
    } catch (err) {
        console.error('Cannot remove order', err)
        throw err
    }
}

export const saveOrder = (order) => async (dispatch) => {
    try {
        const savedOrder = await orderBackendService.save(order)
        const actionType = savedOrder._id ? UPDATE_ORDER : ADD_ORDER
        dispatch({ type: actionType, order: savedOrder })
        return savedOrder
    } catch (err) {
        console.error('Cannot save order', err)
        throw err
    }
}