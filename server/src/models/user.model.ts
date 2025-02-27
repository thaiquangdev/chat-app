import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: string
  email: string
  fullName: string
  password: string
  profilePic?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

const User = mongoose.model<IUser>('User', userSchema)

export default User
