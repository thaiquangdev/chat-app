import mongoose, { Document, Schema } from 'mongoose'

interface IGroup extends Document {
  name: string
  image?: string
  members: Schema.Types.ObjectId[]
  admin: Schema.Types.ObjectId
  createdAt: Date
}

const groupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

const Group = mongoose.model<IGroup>('Group', groupSchema)

export default Group
