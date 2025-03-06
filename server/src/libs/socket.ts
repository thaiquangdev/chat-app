import { Server, Socket } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173']
  }
})

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId]
}

export function getGroupSocketId(groupId: string) {
  const userIds = groupMembers[groupId] || new Set()
  return new Set(
    Array.from(userIds)
      .map((userId) => userSocketMap[userId])
      .filter(Boolean)
  )
}

// use to store online users
const userSocketMap: Record<string, string> = {} // {userId: socketId}

// use to store group
const groupMembers: Record<string, Set<string>> = {}

io.on('connection', (socket: Socket) => {
  console.log('A user connected', socket.id)

  const userId = socket.handshake.query.userId as string | undefined
  if (userId) {
    userSocketMap[userId] = socket.id
  }

  // io.emit() is used to send event to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('joinGroup', (groupId: string) => {
    socket.join(groupId)
    if (!groupMembers[groupId]) {
      groupMembers[groupId] = new Set()
    }

    groupMembers[groupId].add(userId!)

    io.to(groupId).emit('groupUsers', Array.from(groupMembers[groupId]))
    console.log(`👥 ${userId} joined group: ${groupId}`)
  })

  socket.on('leaveGroup', (groupId: string) => {
    socket.leave(groupId)
    if (groupMembers[groupId]) {
      groupMembers[groupId].delete(userId!)
      io.to(groupId).emit('groupUsers', Array.from(groupMembers[groupId]))
      console.log(`🚪 ${userId} left group: ${groupId}`)
    }
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id)
    if (userId) {
      delete userSocketMap[userId]

      for (const groupId in groupMembers) {
        groupMembers[groupId].delete(userId)
        io.to(groupId).emit('groupUsers', Array.from(groupMembers[groupId]))
      }
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { io, app, server }
