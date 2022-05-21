import { Schema, model } from 'mongoose'

const schema = new Schema<Models.Game>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    bargainPrice: { type: Number, required: true },
    discountRate: { type: Number, required: true },
    tag: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    versionKey: false,
  }
)

export const Game = model<Models.Game>('game', schema)
