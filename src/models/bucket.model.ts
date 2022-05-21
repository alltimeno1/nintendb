import { Schema, model } from 'mongoose'

const schema = new Schema<Models.Bucket>(
  {
    id: { type: String, required: true, unique: true },
    list: { type: [String], required: true },
  },
  {
    versionKey: false,
  }
)

export const Bucket = model<Models.Bucket>('bucket', schema)
