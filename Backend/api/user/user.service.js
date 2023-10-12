import fs from 'fs'
import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'

// import mongodb from 'mongodb'
// const { ObjectId } = mongodb
const users = utilService.readJsonFile('data/user.json')

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    updateUser,
    addUser
}

function query(filterBy) {
    let usersToDisplay = [...users]
    if(filterBy.id!=='') {
        usersToDisplay=usersToDisplay.filter((user)=>
        user.sellerId===filterBy.id)
    }
    return Promise.resolve(usersToDisplay)
}

async function getById(userId) {
    // try {
    //     const collection = await dbService.getCollection('user')
    //     const user = await collection.findOne({ _id: new ObjectId(userId) })
    //     delete user.password
    //     return user
    // } catch (err) {
    //     loggerService.error(`while finding user ${userId}`, err)
    //     throw err
    // }
    var user = [...users]
    console.log('userId',userId)
    user = user.find((user) => {
        if(user._id.localeCompare(userId)===0) {
            return true 
        }
        return false
    })
    console.log('user',user)
    if (!user) {
        loggerService.error(`No user found with id ${userId}`)
        throw new Error(`No user found with id ${userId}`)
    }
    return Promise.resolve(user)
}
async function getByUsername(username) {
    // try {
    //     const collection = await dbService.getCollection('user')
    //     const user = await collection.findOne({ username })
    //     return user
    // } catch (err) {
    //     loggerService.error(`while finding user ${username}`, err)
    //     throw err
    // }
    var user = [...users]
    console.log('username',username)
    user = user.find((user) => {
        if(user.username.localeCompare(username)===0) {
            return true 
        }
        return false
    })
    console.log('user',user)
    if (!user) {
        loggerService.error(`No user found with id ${username}`)
        throw new Error(`No user found with id ${username}`)
    }
    return Promise.resolve(user)
}

async function remove(userId) {
    // try {
    //     const collection = await dbService.getCollection('user')
    //     await collection.deleteOne({ _id: new ObjectId(userId) })
    // } catch (err) {
    //     loggerService.error(`cannot remove user ${userId}`, err)
    //     throw err
    // }
    const idx = users.findIndex(user => user._id === userId)
    if (idx === -1) return Promise.reject('No Such User')
    // const user = users[idx]
    // if (user.owner._id !== loggedinUser._id) return Promise.reject('Not your user')
    users.splice(idx, 1)
    return _saveUsersToFile()
}

async function updateUser(user) {
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: new ObjectId(user._id),
            username: user.username,
            fullname: user.fullname,
            score: user.score
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave
    } catch (err) {
        loggerService.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function addUser(user) {
    // try {
    //     // Validate that there are no such user:
    //     const existUser = await getByUsername(user.username)
    //     if (existUser) throw new Error('Username taken')

    //     // peek only updatable fields!
    //     const userToAdd = {
    //         username: user.username,
    //         password: user.password,
    //         fullname: user.fullname,
    //         score: user.score || 0
    //     }
    //     const collection = await dbService.getCollection('user')
    //     await collection.insertOne(userToAdd)
    //     return userToAdd
    // } catch (err) {
    //     loggerService.error('cannot insert user', err)
    //     throw err
    // }
    if (user._id) {
        const newUser = users.find(currUser => currUser._id === user._id)
        // if (userToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your user')
        newUser.fullName=user.fullName
        newUser.avatar=user.avatar
        newUser.username=user.username
        newUser.password=user.password
        newUser.level=user.level
        newUser.rating=user.rating
        newUser.isAdmin=user.isAdmin
    } else {
        user._id = _makeId()
        // user.owner = loggedinUser
        users.push(user)
    }

    return _saveOrdersToFile().then(() => user)
}
function _saveUsersToFile() {
    return new Promise((resolve, reject) => {

        const usersStr = JSON.stringify(users, null, 4)
        fs.writeFile('data/user.json', usersStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}