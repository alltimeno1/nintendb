import { Game } from '../models/title.model'
import { Comment } from '../models/comment.model'
import { Bucket } from '../models/bucket.model'
import { ObjectId } from 'mongodb'

export async function findTitles(sort: string) {
  const title = await Game.find().sort({ [sort]: -1 })
  const top10 = await Game.find().sort({ rating: -1 }).limit(10)

  return [title, top10]
}

export async function findByQuery(keyword: string) {
  const title = await Game.find({ name: { $regex: keyword } })
  const top10 = await Game.find().sort({ rating: -1 }).limit(10)

  return [title, top10]
}

export async function findTitleDetails(id: string) {
  const title = await Game.findOne({ name: id })
  const comment = await Comment.find({ game_id: id })

  return [title, comment]
}

export async function updateWishItem(id: string, gameId: string) {
  const bucket = await Bucket.findOne({ id })

  if (bucket) {
    await Bucket.updateOne({ id: id }, { $addToSet: { list: gameId } })
  } else {
    await Bucket.create({ id: id, list: [gameId] })
  }
}

export async function updateLoginComment(
  gameId: string,
  userId: string,
  displayName: string,
  text: string
) {
  await Comment.create({
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
  await Comment.create({
    game_id: decodeURI(gameId),
    name: userName,
    password,
    text: text.replace(/\n/g, '<br>'),
  })
}

export async function deleteLoginComment(userId: string, commentId: string) {
  await Comment.deleteOne({
    _id: new ObjectId(commentId),
    id: userId,
  })
}

export async function deleteLogoutComment(commentId: string, password: string) {
  const result = await Comment.findOneAndDelete({
    _id: new ObjectId(commentId),
    password: password,
  })

  return result
}
