import express from 'express'

import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
// import { getOrder, getOrders, deleteOrder, updateOrder, addOrder } from './order.controller.js'
import { getOrder, getOrders, removeOrder, updateOrder, addOrder } from './order.db.controller.js'

export const orderRoutes = express.Router()

// middleware that is specific to this router
// orderRoutes.use(requireAuth)

orderRoutes.get('/', getOrders)
orderRoutes.get('/:id', getOrder)
orderRoutes.put('/', updateOrder)
orderRoutes.post('/', addOrder)

// orderRoutes.put('/:id',  requireAuth, updateOrder)
orderRoutes.delete('/:id', requireAuth, requireAdmin, removeOrder)
