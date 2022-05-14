import { connectCollection } from '../utils/mongo'
import { ObjectId } from 'mongodb'

export async function findTitles(sort: string) {
  const games = await connectCollection('games')
  const title = await games
    .find()
    .sort({ [sort]: -1 })
    .toArray()
  const top10 = await games.find().sort({ rating: -1 }).limit(10).toArray()

  return [title, top10]
}

export async function findByQuery(keyword: string) {
  const games = await connectCollection('games')
  const title = await games.find({ name: { $regex: keyword } }).toArray()
  const top10 = await games.find().sort({ rating: -1 }).limit(10).toArray()

  return [title, top10]
}

export async function findTitleDetails(id: string) {
  const games = await connectCollection('games')
  const comments = await connectCollection('comments')
  const title = await games.findOne({ name: id })
  const comment = await comments.find({ game_id: id }).toArray()

  return [title, comment]
}

export async function updateWishItem(id: string, gameId: string) {
  const buckets = await connectCollection('buckets')
  const bucket = await buckets.findOne({ id: id })

  if (bucket) {
    await buckets.updateOne({ id: id }, { $addToSet: { list: gameId } })
  } else {
    await buckets.insertOne({ id: id, list: [gameId] })
  }
}

export async function updateLoginComment(
  gameId: string,
  userId: string,
  displayName: string,
  text: string
) {
  const comments = await connectCollection('comments')

  await comments.insertOne({
    game_id: decodeURI(gameId),
    id: userId,
    name: displayName,
    text: text.replace(/\n/g, '<br>'),
  })
}

export async function updateLogoutComment(
  gameId: string,
  userName: string,
  password: string,
  text: string
) {
  const comments = await connectCollection('comments')

  await comments.insertOne({
    game_id: decodeURI(gameId),
    name: userName,
    password,
    text: text.replace(/\n/g, '<br>'),
  })
}

export async function deleteLoginComment(userId: string, commentId: string) {
  const comments = await connectCollection('comments')

  await comments.deleteOne({
    _id: new ObjectId(commentId),
    id: userId,
  })
}

export async function deleteLogoutComment(commentId: string, password: string) {
  const comments = await connectCollection('comments')
  const result = await comments.findOneAndDelete({
    _id: new ObjectId(commentId),
    password: password,
  })

  return result
}
