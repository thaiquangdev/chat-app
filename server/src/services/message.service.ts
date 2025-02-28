import cloudinary from '~/libs/cloudinary'
import Message from '~/models/message.model'

export const getMessagesService = async (userId: string, chatPartnerId: string) => {
  return await Message.find({
    $or: [
      { senderId: userId, receiverId: chatPartnerId },
      { senderId: chatPartnerId, receiverId: userId }
    ]
  }).sort({ createdAt: 1 }) // Sắp xếp theo thời gian gửi
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

  return newMessage
}
