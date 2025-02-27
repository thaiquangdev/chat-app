import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '~/models/user.model'
import { AppError } from './error.middleware'

export const protectRoute = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt

  if (!token) {
    throw new AppError('Unauthorized - No Token Provider', 401)
  }

  const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload

  if (!decoded) {
    throw new AppError('Unauthorized - Invalid Token', 401)
  }

  const user = await User.findById(decoded.userId).select('-password')

  if (!user) {
    throw new AppError('Không tìm thấy người dùng', 404)
  }

  req.user = user

  next()
})
