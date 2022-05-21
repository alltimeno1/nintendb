import { Schema, model } from 'mongoose'

const schema = new Schema<Models.Count>(
  {
    count: { type: Number, required: true },
    name: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
  }
)

export const Count = model<Models.Count>('count', schema)
