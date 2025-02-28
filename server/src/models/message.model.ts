import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage extends Document {
  _id: string
  senderId: mongoose.Schema.Types.ObjectId
  receiverId: mongoose.Schema.Types.ObjectId
  text: string
  image: string
  createdAt: Date
  updatedAt: Date
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
)

const Message = mongoose.model<IMessage>('Message', messageSchema)

export default Message
