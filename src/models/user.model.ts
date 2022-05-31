import { Schema, model } from 'mongoose'

const schema = new Schema<Models.User>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    provider: { type: String, required: true },
    profileImage: String,
  },
  {
    versionKey: false,
  }
)

export const User = model<Models.User>('user', schema)
