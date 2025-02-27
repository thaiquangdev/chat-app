import { Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, String(process.env.JWT_SECRET), { expiresIn: '7d' })

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development'
  })

  return token
}
