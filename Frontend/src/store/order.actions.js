import { orderService } from "../services/order.service.local.js"
import { orderBackendService } from "../services/order.backend.service.js"
import { store } from '../store/store.js'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS } from "./order.reducer.js"

export async function loadOrders(filterBy = {}) {
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const orders = await orderBackendService.query(filterBy)
        store.dispatch({ type: SET_ORDERS, orders })
    } catch (err) {
        console.log('cannot load orders, heres why:', err)
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeOrder(orderId) {
    try {
        await orderBackendService.remove(orderId)
        store.dispatch({ type: REMOVE_ORDER, orderId })
    } catch (err) {
        console.log('Cannot remove order', err)
        throw err
    }
}

export async function saveOrder(order) {
    const type = ADD_ORDER
    // try {
    //     const savedOrder = await orderService.save(order)
    //     console.log(order._id ? 'Updated order' : 'Added order', savedOrder)
    //     store.dispatch({ type, order: savedOrder })
    //     return savedOrder
    // } catch (err) {
    //     console.log('Cannot save order', err)
    //     throw err
    // }
    // const type = toy._id ? UPDATE_TOY : ADD_TOY
    return orderBackendService.save(order)
        .then(orderToSave => {
            store.dispatch({ type, order: orderToSave })
            return orderToSave
        })
        .catch(err => {
            console.log('order action -> Cannot save order', err)
            throw err
        })
}
// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveorderOptimistic(orderId) {
//     store.dispatch({
//         type: REMOVE_ORDER,
//         orderId
//     })
//     showSuccessMsg('order removed')

//     orderService.remove(orderId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove order')
//             console.log('Cannot load orders', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_ORDER
//             })
//         })
// }