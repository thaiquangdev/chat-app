import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { AppError } from '~/middlewares/error.middleware'
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
