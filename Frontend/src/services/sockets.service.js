import io from 'socket.io-client'

const socket = io('http://localhost:3030/') // Replace with your server URL

export { socket }
