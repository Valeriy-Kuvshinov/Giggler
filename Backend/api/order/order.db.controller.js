import { loggerService } from '../../services/logger.service.js'
import { orderService } from './order.db.service.js'

export async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    }
    catch (err) {
        loggerService.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

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

export async function removeOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    }
    catch (err) {
        loggerService.error('Failed to delete order', err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}

export async function updateOrder(req, res) {
    try {
        const order = req.body
        const savedOrder = await orderService.save(order)
        res.send(savedOrder)
    }
    catch (err) {
        loggerService.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    }
}

export async function addOrder(req, res) {
    try {
        const order = req.body
        const addedOrder = await orderService.save(order)
        res.json(addedOrder)
    }
    catch (err) {
        loggerService.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}