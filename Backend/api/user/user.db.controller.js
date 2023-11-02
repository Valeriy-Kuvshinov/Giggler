import { loggerService } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'
import { userService } from '../user/user.db.service.js'
import { authService } from '../auth/auth.service.js'

export async function getUser(req, res) {
  try {
    const user = await userService.getById(req.params.id)
    res.send(user)
  } catch (err) {
    loggerService.error('Failed to get user', err)
    res.status(500).send({ err: 'Failed to get user' })
  }
}

export async function getUsers(req, res) {
  try {
    const users = await userService.query(req.query)
    res.send(users)
  } catch (err) {
    loggerService.error('Cannot get users', err)
    res.status(500).send({ err: 'Failed to get users' })
  }
}

// export async function deleteUser(req, res) {
//   var { loggedinUser } = req

//   try {
//     const deletedCount = await userService.remove(req.params.id)
//     if (deletedCount === 1) {
//       res.send({ msg: 'Deleted successfully' })
//       socketService.broadcast({
//         type: 'user-removed',
//         data: req.params.id,
//         userId: loggedinUser._id,
//       })
//     } else {
//       res.status(500).send({ err: 'Cannot remove user' })
//     }
//   } catch (err) {
//     loggerService.error('Failed to delete user', err)
//     res.status(500).send({ err: 'Failed to delete user' })
//   }
// }

export async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(400).send({ err: 'Failed to delete user' })
    }
}

export async function updateUser(req, res) {
  try {
    const user = req.body
    const savedUser = await userService.update(user)
    res.send(savedUser)
  } catch (err) {
    logger.error('Failed to update user', err)
    res.status(500).send({ err: 'Failed to update user' })
  }
}

// export async function addUser(req, res) {

//     let { loggedinUser } = req

//     try {
//         console.log(req.body)
//         var user = req.body
//         user.userId = loggedinUser._id
//         user = await userService.add(user)

//         // prepare the updated user for sending out

//         // Give the user credit for adding a user
//         const fullUser = await userService.getById(user.userId)

//         loggedinUser = await userService.update(fullUser)

//         // User info is saved also in the login-token, update it
//         const loginToken = authService.getLoginToken(loggedinUser)
//         res.cookie('loginToken', loginToken)

//         delete user.userId

//         // socketService.broadcast({ type: 'user-added', data: user, userId: loggedinUser._id })
//         // socketService.emitToUser({ type: 'user-about-you', data: user, userId: user.aboutUser._id })

//         // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

//         res.send(user)

//     } catch (err) {
//         loggerService.error('Failed to add user', err)
//         res.status(500).send({ err: 'Failed to add user' })
//     }
// }
