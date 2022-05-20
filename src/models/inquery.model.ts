import { Schema, model } from 'mongoose'

const schema = new Schema<Models.Inquery>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    versionKey: false,
  }
)

export const Inquery = model<Models.Inquery>('inquery', schema)
