import cloudinary from '~/libs/cloudinary'
import { getGroupSocketId, getReceiverSocketId, io } from '~/libs/socket'
import Message from '~/models/message.model'

export const getMessagesService = async (userId: string, chatPartnerId: string) => {
  return await Message.find({
    $or: [
      { senderId: userId, receiverId: chatPartnerId },
      { senderId: chatPartnerId, receiverId: userId }
    ]
  }).sort({ createdAt: 1 }) // Sắp xếp theo thời gian gửi
}

export const getMessagesGroupService = async (groupId: string) => {
  return await Message.find({ groupId }).sort({ createdAt: 1 })
}

export const sendMessageService = async (image: string, text: string, receiverId: string, senderId: string) => {
  let imageUrl
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image)
    imageUrl = uploadResponse.secure_url
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl
  })

  await newMessage.save()

  const receiverSocketId = getReceiverSocketId(receiverId)
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage)
  }

  return newMessage
}

export const sendMessageGroupService = async (image: string, text: string, groupId: string, senderId: string) => {
  let imageUrl
  if (image) {
    const uploadResponsee = await cloudinary.uploader.upload(image)
    imageUrl = uploadResponsee.secure_url
  }

  const newMessage = new Message({
    senderId,
    groupId,
    text,
    image: imageUrl
  })

  await newMessage.save()

  const groupSocketId = getGroupSocketId(groupId)
  if (groupSocketId && groupSocketId.size > 0) {
    groupSocketId.forEach((socketId) => {
      io.to(socketId).emit('newMessageGroup', newMessage)
    })
  }

  return newMessage
}
