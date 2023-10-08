export const SET_ORDERS = 'SET_ORDERS'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
import { orderService } from "../services/order.service.local"
const initialState = {
    orders: [],
    isLoading: false,
    // filterBy: orderService.getDefaultFilter()
}

export function orderReducer(state = initialState, action = {}) {
    let orders
    switch (action.type) {
        case SET_ORDERS:
            return { ...state, orders: action.orders }
        case REMOVE_ORDER:
            orders = state.orders.filter(order => order._id !== action.orderId)
            return { ...state, orders }
        case ADD_ORDER:
            orders = [...state.orders, action.order]
            return { ...state, orders }
        default:
            return state
    }
}

// export const UNDO_REMOVE_ORDER = 'UNDO_REMOVE_ORDER'

// case UNDO_REMOVE_ORDER:
//     if (state.lastRemovedOrder) {
//         newState = { ...state, orders: [...state.orders, state.lastRemovedOrder], lastRemovedOrder: null }
//     }
//     break