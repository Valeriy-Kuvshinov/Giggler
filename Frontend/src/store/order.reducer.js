export const SET_ORDERS = 'SET_ORDERS'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    orders: [],
    isLoading: false,
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
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.order._id ? action.order : order
                ),
            }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}