import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { getMessagesService, sendMessageService } from '~/services/message.service'

export const getMessages = expressAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const senderId = req.user?._id

  const messages = await getMessagesService(String(senderId), id)

  res.status(200).json(messages)
})

export const sendMessage = expressAsyncHandler(async (req: Request, res: Response) => {
  const { text, image } = req.body
  const { id: receiverId } = req.params
  const senderId = req.user._id

  const message = await sendMessageService(image, text, receiverId, senderId)

  res.status(201).json(message)
})
