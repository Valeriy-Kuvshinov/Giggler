import express from 'express'
import { getUsers, getUserById, removeUser, updateUser, addUser } from './user.controller.js'
// import { getUsers, getUserById, removeUser, updateUser, addUser } from './user.db.controller.js'

export const userRoutes = express.Router()

// middleware that is specific to this router
// userRoutes.use(requireAuth) // Uncomment if you want to require auth for all user routes

userRoutes.get('/', getUsers)
userRoutes.get('/:id', getUserById)
userRoutes.put('/', updateUser)
userRoutes.post('/', addUser)
userRoutes.delete('/:id', removeUser)