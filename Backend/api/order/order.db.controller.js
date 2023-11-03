import { loggerService } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'
import { userService } from '../user/user.db.service.js'
import { authService } from '../auth/auth.service.js'
import { orderService } from './order.db.service.js'

export async function getOrder(req, res) {
    try {
        const order = await orderService.getById(req.params.id)
        res.send(order)
    }
    catch (err) {
        loggerService.error('Failed to get order', err)
        res.status(500).send({ err: 'Failed to get order' })
    }
}

export async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        loggerService.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

export async function deleteOrder(req, res) {
    let { loggedinUser } = req

    try {
        const deletedCount = await orderService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
            socketService.broadcast({ type: 'order-removed', data: req.params.id, userId: loggedinUser._id })
        } else {
            res.status(500).send({ err: 'Cannot remove order' })
        }
    } catch (err) {
        loggerService.error('Failed to delete order', err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}

export async function addOrder(req, res) {

    let { loggedinUser } = req

    try {
        console.log(req.body)
        var order = req.body
        order.userId = loggedinUser._id
        order = await orderService.add(order)

        // prepare the updated order for sending out

        // Give the user credit for adding a order
        const fullUser = await userService.getById(order.userId)

        loggedinUser = await userService.update(fullUser)

        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        delete order.userId

        // socketService.broadcast({ type: 'order-added', data: order, userId: loggedinUser._id })
        // socketService.emitToUser({ type: 'order-about-you', data: order, userId: order.aboutUser._id })

        // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        res.send(order)

    } catch (err) {
        loggerService.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}