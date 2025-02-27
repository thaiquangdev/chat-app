import { Request, Response } from 'express'
import { loginUser, registerUser } from '../services/auth.service'
import { generateToken } from '~/libs/utils'
import { AppError } from '~/middlewares/error.middleware'
import expressAsyncHandler from 'express-async-handler'

export const register = expressAsyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body

  if (!fullName || !email || !password) {
    throw new AppError('Vui lòng nhập đầy đủ thông tin', 400)
  }

  if (password.length < 6) {
    throw new AppError('Mật khẩu phải có ít nhất 6 ký tự', 400)
  }

  const user = await registerUser(fullName, email, password)

  generateToken(String(user._id), res)

  res.status(201).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic
  })
})

export const login = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new AppError('Vui lòng nhập đầy đủ thông tin', 400)
  }

  if (password.length < 6) {
    throw new AppError('Mật khẩu phải có ít nhất 6 ký tự', 400)
  }

  const user = await loginUser(email, password)

  generateToken(String(user._id), res)

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic
  })
})

export const logout = expressAsyncHandler(async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    maxAge: 0
  })
  res.status(200).json({ message: 'Đăng xuất thành công' })
})

export const checkAuth = expressAsyncHandler((req: Request, res: Response) => {
  res.status(200).json(req.user)
})
