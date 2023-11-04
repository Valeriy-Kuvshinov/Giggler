import { Server } from 'socket.io'

const io = new Server()

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('open_chat', (data) => {
    const { room } = data
    socket.join(room)
    io.to(socket.id).emit('chat_room_opened', { room })
  })

  socket.on('send_message', (data) => {
    io.to(data.room).emit('new_message', { message: data.message })
  })

  // ... other socket.io event listeners

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id)
  })
})

export { io }
