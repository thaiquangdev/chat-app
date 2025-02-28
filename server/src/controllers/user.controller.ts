import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { AppError } from '~/middlewares/error.middleware'
import User from '~/models/user.model'
import { updateProfileUser } from '~/services/user.service'

export const updateProfile = expressAsyncHandler(async (req: Request, res: Response) => {
  const { profilePic } = req.body
  const { _id } = req.user

  if (!profilePic) {
    throw new AppError('Bắt buộc phải thêm ảnh', 400)
  }

  const update = await updateProfileUser(profilePic, String(_id))

  res.status(200).json({
    update
  })
})

export const getUserForSidebar = expressAsyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.user
  const filteredUsers = await User.find({ _id: { $ne: _id } }).select('-password')

  res.status(200).json({ filteredUsers })
})
