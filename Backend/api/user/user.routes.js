import express from 'express'
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { getUsers, getUserById, removeUser, updateUser, addUser } from './user.controller.js'

export const userRoutes = express.Router()

// middleware that is specific to this router
// userRoutes.use(requireAuth) // Uncomment if you want to require auth for all user routes

userRoutes.get('/', getUsers)
userRoutes.get('/:id', getUserById)
userRoutes.put('/', updateUser)
userRoutes.post('/', addUser)
userRoutes.delete('/:id', removeUser)