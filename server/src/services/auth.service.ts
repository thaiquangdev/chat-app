import bcryptjs from 'bcryptjs'
import { AppError } from '~/middlewares/error.middleware'
import User from '~/models/user.model'

export const registerUser = async (fullName: string, email: string, password: string) => {
  // Kiểm tra email đã tồn tại chưa
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new AppError('Email này đã tồn tại', 400)
  }

  // Hash mật khẩu
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password, salt)

  // Tạo user mới
  const newUser = new User({
    fullName,
    email,
    password: hashedPassword
  })

  await newUser.save()
  return newUser
}

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError('Email hoặc mật khẩu không đúng', 400)
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new AppError('Email hoặc mật khẩu không đúng', 400)
  }

  return user
}
