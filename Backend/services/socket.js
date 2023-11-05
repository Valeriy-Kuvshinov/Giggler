import { Server } from 'socket.io'

const io = new Server()

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('open_chat', (data) => {
    const { room, sellerId, buyer } = data
    socket.join(room)
    // Emit 'chat_room_opened' event with 'room'
    io.emit('chat_room_opened', {  room, sellerId, buyer})

    socket.sellerId = sellerId
    socket.buyer = buyer
    socket[sellerId] = room
  })

  socket.on('request_access_to_chat', (data) => {
    const { room } = data
    
    // Allow the seller to join the existing chat room created by the buyer.
    socket.join(room)

    // You can emit a message or event to acknowledge that the seller has joined the chat.
    io.to(room).emit('seller_joined_chat', {
      message: 'Seller has joined the chat.',
    })
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
