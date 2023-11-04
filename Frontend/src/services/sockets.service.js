import io from 'socket.io-client'

const socket = io('http://localhost:5173/') // Replace with your server URL

export { socket }
