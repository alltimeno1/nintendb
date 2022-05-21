import { Schema, model } from 'mongoose'

const schema = new Schema<Models.Board>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    nickname: { type: String, required: true },
    password: String,
    user_id: String,
    text: { type: String, required: true },
    date: { type: Date, required: true },
    viewCount: { type: Number, required: true },
    recommend: { type: [String], required: true },
  },
  {
    versionKey: false,
  }
)

export const Board = model<Models.Board>('board', schema)
