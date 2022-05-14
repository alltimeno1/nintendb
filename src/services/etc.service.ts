import { connectCollection } from '../utils/mongo'

async function findSortedList() {
  const games = await connectCollection('games')

  const best = await games.find().sort({ rating: -1 }).limit(4).toArray()
  const recent = await games.find().sort({ date: -1 }).limit(4).toArray()
  const sale = await games.find().sort({ discountRate: -1 }).limit(4).toArray()

  return [best, recent, sale]
}

async function insertInquery(name: string, email: string, message: string) {
  const inquery = await connectCollection('inquery')

  await inquery.insertOne({
    name,
    email,
    message,
  })
}

export { findSortedList, insertInquery }
