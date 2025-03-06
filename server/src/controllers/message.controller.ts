import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
  getMessagesGroupService,
  getMessagesService,
  sendMessageGroupService,
  sendMessageService
} from '~/services/message.service'

export const getMessages = expressAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const senderId = req.user?._id

  const messages = await getMessagesService(String(senderId), id)

  res.status(200).json(messages)
})

export const getMessagesGroup = expressAsyncHandler(async (req: Request, res: Response) => {
  const { groupId } = req.params
  const messages = await getMessagesGroupService(groupId)

  res.status(200).json(messages)
})

export const sendMessage = expressAsyncHandler(async (req: Request, res: Response) => {
  const { text, image, id: receiverId } = req.body
  const senderId = req.user._id

  const message = await sendMessageService(image, text, receiverId, senderId)

  res.status(201).json(message)
})

export const sendMessageGroup = expressAsyncHandler(async (req: Request, res: Response) => {
  const { text, image, id: groupId } = req.body
  const senderId = req.user._id

  const message = await sendMessageGroupService(image, text, groupId, senderId)

  res.status(201).json(message)
})
