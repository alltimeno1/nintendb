import { Inquery } from '../models/inquery.model'
import { Game } from '../models/title.model'

async function findSortedList() {
  const best = await Game.find().sort({ rating: -1 }).limit(4)
  const recent = await Game.find().sort({ date: -1 }).limit(4)
  const sale = await Game.find().sort({ discountRate: -1 }).limit(4)

  return { best, recent, sale }
}

async function insertInquery(name: string, email: string, message: string) {
  await Inquery.create({
    name,
    email,
    message,
  })
}

export { findSortedList, insertInquery }
