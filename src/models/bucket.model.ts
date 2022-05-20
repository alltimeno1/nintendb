import { Schema, model } from 'mongoose'

const schema = new Schema<Models.Bucket>(
  {
    id: { type: String, required: true },
    list: [String],
  },
  {
    versionKey: false,
  }
)

export const Bucket = model<Models.Bucket>('bucket', schema)
