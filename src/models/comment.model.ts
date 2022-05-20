import { Schema, model } from 'mongoose'

const schema = new Schema<Models.Comment>(
  {
    game_id: { type: String, required: true },
    name: { type: String, required: true },
    password: String,
    id: String,
    text: { type: String, required: true },
  },
  {
    versionKey: false,
  }
)

export const Comment = model<Models.Comment>('comment', schema)
